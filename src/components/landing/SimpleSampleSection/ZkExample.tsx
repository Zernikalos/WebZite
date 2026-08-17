'use client';

import { useEffect, useRef } from 'react';
import * as zernikalos from '@zernikalos/zernikalos';

interface ZkExampleProps {
  onError: () => void;
}

function listActions(loaded: {
  actions?: {
    toArray?: () => readonly unknown[];
    asJsReadonlyArrayView?: () => readonly unknown[];
  } | null;
}): any[] {
  const actions = loaded.actions;
  if (!actions) return [];
  if (typeof actions.toArray === 'function') {
    return actions.toArray().filter(Boolean);
  }
  if (typeof actions.asJsReadonlyArrayView === 'function') {
    return Array.from(actions.asJsReadonlyArrayView()).filter(Boolean);
  }
  return [];
}

/** Prefer the Run clip for the landing hero; fall back to a mid/last clip. */
function pickRunAction(actions: any[]): any | undefined {
  const byName = actions.find((a) => {
    const name = a?.name?.toString?.() ?? '';
    return name.toLowerCase() === 'run';
  });
  if (byName) return byName;
  return actions[2] ?? actions[actions.length - 1];
}

/**
 * Interactive 3D demo component using the Zernikalos engine.
 * Loads and displays an animated 3D model.
 */
export default function ZkExample({ onError }: ZkExampleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use refs to hold zernikalos instances to avoid re-initialization on re-renders
  const zkRef = useRef<zernikalos.zernikalos.Zernikalos | null>(null);
  const playerRef = useRef<zernikalos.zernikalos.action.ZActionPlayer | null>(null);

  useEffect(() => {
    // This effect should only run on the client side
    if (typeof window === 'undefined' || !canvasRef.current || !containerRef.current) {
      return;
    }

    let cancelled = false;
    /** True only after `onReady` calls `done()` — dispose() before that throws in the engine. */
    let readyForDispose = false;

    const canvas = canvasRef.current;

    // Initialize Zernikalos
    const zk = new zernikalos.zernikalos.Zernikalos();
    zkRef.current = zk;
    zk.settings.logLevel = zernikalos.zernikalos.logger.ZLogLevel.ERROR;

    const player = new zernikalos.zernikalos.action.ZActionPlayer();
    playerRef.current = player;

    async function loadScene() {
      // Prefer the synced DemoApps asset (same source as /demos).
      return await zernikalos.zernikalos.loader.loadFromUrl('/demos/zko/gltf/Fox.zko');
    }

    try {
      zk.initializeWithCanvas(canvas, {
        onReady(ctx: any, done: () => void) {
          loadScene()
            .then((loaded) => {
              if (cancelled) {
                readyForDispose = true;
                done();
                try {
                  zk.dispose();
                } catch {
                  /* engine may already be tearing down */
                }
                return;
              }

              // Scene setup mirrors DemoApps/web/examples/fox.html, with a slightly
              // elevated camera framing for the landing hero.
              const root = loaded.root;
              const scene = new zernikalos.zernikalos.objects.ZScene();
              const camera = new zernikalos.zernikalos.objects.ZCamera();

              scene.viewport.clearColor.alpha = 0;

              const ambientLight =
                zernikalos.zernikalos.objects.ZLight.Companion.createAmbientLight();
              ambientLight.intensity = 0.1;
              const light = new zernikalos.zernikalos.objects.ZLight();
              light.lamp = new zernikalos.zernikalos.components.light.ZDirectionalLamp();

              scene.addChild(root);
              scene.addChild(ambientLight);
              scene.addChild(light);
              scene.addChild(camera);
              ctx.activeCamera = camera;
              ctx.scene = scene;

              const mainObj = zernikalos.zernikalos.search.findFirstModel(scene);
              mainObj?.transform?.scaleByFactor?.(0.1);

              // Base framing from fox.html (0, -5, -30), raised and pitched for a
              // high three-quarter view of the running fox.
              camera.transform.translate(1, -7, -21);
              camera.transform.rotateDegrees(-45, 0, 1, 0);

              const actions = listActions(loaded);
              const runAction = pickRunAction(actions);
              if (mainObj?.skeleton && runAction) {
                player.setAction(mainObj.skeleton, runAction);
                player.play(true);
              }

              readyForDispose = true;
              done();
            })
            .catch((error) => {
              console.error('Failed to load Zernikalos scene:', error);
              if (!cancelled) {
                onError();
              }
              readyForDispose = true;
              done();
              if (cancelled) {
                try {
                  zk.dispose();
                } catch {
                  /* engine may already be tearing down */
                }
              }
            });
        },
        onUpdate(_ctx: any, done: () => void) {
          if (!cancelled) {
            player.update();
          }
          done();
        },
        onRender(_ctx: any, done: () => void) {
          done();
        },
        onResize(_ctx: any, _width: number, _height: number, done: () => void) {
          done();
        },
      } as any);
    } catch (error) {
      console.error('Failed to initialize Zernikalos canvas:', error);
      onError();
    }

    // Cleanup function
    return () => {
      cancelled = true;
      try {
        playerRef.current?.stop();
      } catch {
        /* ignore */
      }
      playerRef.current = null;

      const zkInstance = zkRef.current;
      zkRef.current = null;
      if (zkInstance && readyForDispose && typeof zkInstance.dispose === 'function') {
        try {
          zkInstance.dispose();
        } catch {
          /* ignore */
        }
      }
    };
  }, [onError]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] max-w-[900px] mx-auto rounded-lg overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
