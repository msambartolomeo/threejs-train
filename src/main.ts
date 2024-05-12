import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { build_terrain } from "./terrain";
import { train_path } from "./train/path";
import { createRail } from "./train/rail";

function main() {
    const camera = new Three.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(500, 200, 0);

    const renderer = new Three.WebGLRenderer();
    renderer.setClearColor(0xa8bbe6, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const scene = new Three.Scene();

    const ambientLight = new Three.AmbientLight("#ffffff", 1);
    const directionaLight = new Three.DirectionalLight("#ffffff", 2);
    directionaLight.position.set(1000, 1000, 1000);
    scene.add(directionaLight);
    scene.add(ambientLight);

    build_terrain(scene);

    const path = train_path();

    createRail(scene, path);

    function render() {
        renderer.render(scene, camera);

        controls.update();

        requestAnimationFrame(render);
    }

    render();
}

window.onload = main;
