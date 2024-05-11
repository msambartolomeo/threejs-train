import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
    const camera = new Three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(15, 15, 50);

    const renderer = new Three.WebGLRenderer();
    renderer.setClearColor(0xa8bbe6, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const scene = new Three.Scene();

    function render() {
        renderer.render(scene, camera);

        controls.update();

        requestAnimationFrame(render);
    }

    render();
}

window.onload = main;
