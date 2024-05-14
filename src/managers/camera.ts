import * as Three from "three";
import KeyboardManager from "./keyboard";

export default class CameraManager {
    private static instance: CameraManager;

    static getInstance(): CameraManager {
        return this.instance;
    }

    renderer!: Three.Renderer;
    scene!: Three.Scene;
    cameras: Array<[Three.PerspectiveCamera, any | undefined]> = [];
    current: number = 0;
    keyboardManager: KeyboardManager = KeyboardManager.getInstance();

    constructor(renderer: Three.Renderer, scene: Three.Scene) {
        if (CameraManager.instance) {
            return CameraManager.instance;
        }
        CameraManager.instance = this;

        this.renderer = renderer;
        this.scene = scene;
    }

    add(camera: Three.PerspectiveCamera, key: string, controls?: any) {
        this.cameras.push([camera, controls]);

        const length = this.cameras.length;

        this.keyboardManager.add(
            key,
            (i) => {
                const oldControls = this.cameras[this.current][1];
                if (oldControls) {
                    oldControls.enabled = false;
                }
                this.current = i;
                const newControls = this.cameras[this.current][1];
                if (newControls) {
                    newControls.enabled = true;
                }
            },
            length - 1
        );

        if (length === 1) {
            this.keyboardManager.add("c", () => {
                const oldControls = this.cameras[this.current][1];
                if (oldControls) {
                    oldControls.enabled = false;
                }
                this.current += 1;
                this.current %= this.cameras.length;
                const newControls = this.cameras[this.current][1];
                if (newControls) {
                    newControls.enabled = true;
                }
            });
            window.addEventListener("resize", () => {
                const [camera, _] = this.cameras[this.current];

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }

    render(delta: number) {
        const [camera, controls] = this.cameras[this.current];
        this.renderer.render(this.scene, camera);
        if (controls) {
            controls.update(delta);
        }
    }
}
