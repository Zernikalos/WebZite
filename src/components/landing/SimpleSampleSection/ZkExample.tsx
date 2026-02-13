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
      return await zernikalos.zernikalos.loader.loadFromUrl('/Fox0150.zko');
    }

    try {
      zk.initializeWithCanvas(canvas, {
        onReady(ctx: any, done: () => void) {
          loadScene()
            .then((loaded) => {
              const g = loaded.root;
              const action = loaded.actions?.toArray?.()?.[2];
              const scene = new zernikalos.zernikalos.objects.ZScene();
              const camera = new zernikalos.zernikalos.objects.ZCamera();

              scene.viewport.clearColor.alpha = 0;

              scene.addChild(g);
              scene.addChild(camera);

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
              done();
            })
            .catch((error) => {
              console.error('Failed to load Zernikalos scene:', error);
              onError();
              done();
            });
        },
        onUpdate(_ctx: any, done: () => void) {
          player.update();
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
      if (playerRef.current) {
        playerRef.current.stop();
      }
      if (zkRef.current && typeof zkRef.current.dispose === 'function') {
        zkRef.current.dispose();
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
