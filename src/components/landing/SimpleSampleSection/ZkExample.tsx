'use client';

import { useEffect, useRef } from 'react';
import * as zernikalos from '@zernikalos/zernikalos';

interface ZkExampleProps {
  onError: () => void;
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

    function getMainObj(scene: zernikalos.zernikalos.objects.ZScene) {
      return zernikalos.zernikalos.search.findFirstModel(scene);
    }

    async function loadScene() {
      // Models should be placed in the public folder
      return await zernikalos.zernikalos.loader.loadFromUrl('/Fox.zko');
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

              const g = loaded.root;
              const action = loaded.actions?.asJsReadonlyArrayView()[2];
              const scene = new zernikalos.zernikalos.objects.ZScene();
              const camera = new zernikalos.zernikalos.objects.ZCamera();

              scene.viewport.clearColor.alpha = 0;

              const ambientLight = zernikalos.zernikalos.objects.ZLight.Companion.createAmbientLight();
              ambientLight.intensity = 0.1;
              const light = new zernikalos.zernikalos.objects.ZLight();
              light.lamp = new zernikalos.zernikalos.components.light.ZDirectionalLamp();
              light.transform.rotation = zernikalos.zernikalos.math.ZQuaternion.initWithValues(0, 0, 0, 1);
              light.intensity = 2.0;

              scene.addChild(g);
              scene.addChild(camera);
              scene.addChild(ambientLight);
              scene.addChild(light);

              ctx.activeCamera = camera;

              camera?.transform?.rotate(180, 1, 0, 0);
              camera?.transform?.rotate(180, 0, 1, 0);

              const mainObj = getMainObj(scene);
              if (mainObj && action) {
                mainObj.transform.scaleByFactor(0.1);
                player.setAction(mainObj, action);
                player.play(true);
              }

              ctx.activeCamera?.transform?.translate(-1, -7, -21);
              ctx.activeCamera?.transform?.rotate(-45, 0, 1, 0);

              ctx.scene = scene;
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
