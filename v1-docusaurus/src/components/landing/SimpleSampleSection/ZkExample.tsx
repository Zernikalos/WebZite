import { useEffect, useRef } from "react";
import * as zernikalos from "@zernikalos/zernikalos";
import styles from './styles.module.css';

interface ZkExampleProps {
    onError: () => void;
}

export default function ZkExample({ onError }: ZkExampleProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Use refs to hold zernikalos instances to avoid re-initialization on re-renders
    // and to access them in the cleanup function.
    const zkRef = useRef<zernikalos.zernikalos.Zernikalos | null>(null);
    const playerRef = useRef<zernikalos.zernikalos.action.ZActionPlayer | null>(null);

    useEffect(() => {
        // This effect should only run on the client side, once the component has mounted.
        if (typeof window === 'undefined' || !canvasRef.current || !containerRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const container = containerRef.current;

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
            // Models should be placed in the `static` folder of your Docusaurus project
            // to be accessible from the root URL.
            return await zernikalos.zernikalos.loader.loadFromUrl('/Fox0120.zko');
        }

        try {
            zk.initializeWithCanvas(canvas, {
                onReady(ctx, done) {
                    loadScene().then(loaded => {
                        const g = loaded.root;
                        const action = loaded.actions.toArray()[2];
                        const scene = new zernikalos.zernikalos.objects.ZScene();
                        const camera = new zernikalos.zernikalos.objects.ZCamera();

                        scene.viewport.clearColor.alpha = 0;

                        scene.addChild(g);
                        scene.addChild(camera);

                        ctx.activeCamera = camera;

                        camera?.transform?.rotate(180, 1, 0, 0);
                        camera?.transform?.rotate(180, 0, 1, 0);

                        const mainObj = getMainObj(scene);
                        if (mainObj) {
                            mainObj.transform.scaleByFactor(0.1);
                            player.setAction(mainObj, action);
                            player.play(true);
                        }

                        ctx.activeCamera?.transform?.translate(-1, -7, -21);
                        ctx.activeCamera?.transform?.rotate(-45, 0, 1, 0);

                        ctx.scene = scene;
                        done();
                    }).catch(error => {
                        console.error("Failed to load Zernikalos scene:", error);
                        onError();
                        done();
                    });
                },
                onRender(ctx, done) {
                    player.update();
                    done();
                },
                onResize(ctx, width, height, done) {
                    done();
                }
            } as any);
        } catch (error) {
            console.error("Failed to initialize Zernikalos canvas:", error);
            onError();
        }


        // Cleanup function to run when the component unmounts
        return () => {
            if (playerRef.current) {
                playerRef.current.stop();
            }
            // Clean up WebGPU resources
            if (zkRef.current && typeof zkRef.current.dispose === 'function') {
                zkRef.current.dispose();
            }
        };
    }, [onError]); // Add onError to dependencies

    return (
        <div ref={containerRef} className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
