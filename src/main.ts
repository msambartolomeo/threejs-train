import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { build_terrain } from "./terrain";
import { trainPath } from "./path";
import { createRailway } from "./rail";
import { createTrain, startTrainOnPath } from "./train";
import Animations from "./animation";

function init(): readonly [Three.Camera, Three.WebGLRenderer, Three.Scene] {
    const camera = new Three.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const renderer = new Three.WebGLRenderer();
    renderer.setClearColor(0xa8bbe6, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new Three.Scene();

    // TODO: Cleanup
    camera.position.set(0, 400, 0);

    build_terrain(scene);

    const ambientLight = new Three.AmbientLight("white", 0.5);
    scene.add(ambientLight);

    const directionaLight = new Three.DirectionalLight("white", 2);
    directionaLight.position.set(0, 1, 0);
    directionaLight.target.position.set(2, 0, 2);
    scene.add(directionaLight.target);
    scene.add(directionaLight);

    return [camera, renderer, scene];
}

function main() {
    const [camera, renderer, scene] = init();

    const controls = new OrbitControls(camera, renderer.domElement);

    const path = trainPath();

    const railway = createRailway(path);
    railway.position.setY(37);
    scene.add(railway);

    const train = createTrain();
    scene.add(train);
    startTrainOnPath(train, path);

    const animations = Animations.getInstance();

    const time = new Three.Clock();

    function render() {
        renderer.render(scene, camera);

        controls.update();

        animations.run(time.getDelta());

        requestAnimationFrame(render);
    }

    render();
}

window.onload = main;
