import * as Three from "three";
import * as P from "./primitives";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { build_terrain } from "./terrain";
import { placeAlongPath, trainPath } from "./path";
import { createRailway } from "./models/rail";
import { createTrain, startTrainOnPath } from "./models/train";
import { createTunnel } from "./models/tunnel";
import { createBridge } from "./models/bridge";
import { createLamp } from "./models/lamp";
import { treePatch } from "./models/tree";
import { createSun } from "./models/sun";
import AnimationManager from "./managers/animation";
import KeyboardManager from "./managers/keyboard";
import LightManager from "./managers/light";
import CameraManager from "./managers/camera";

function init(): readonly [CameraManager, Three.Scene] {
    const renderer = new Three.WebGLRenderer();
    renderer.setClearColor(0xa8bbe6, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = Three.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement);

    const lightManager = LightManager.getInstance();

    lightManager.add(
        renderer,
        (r) => r.setClearColor(0xa8bbe6, 1.0),
        (r) => r.setClearColor(0x17181f, 1.0)
    );

    const scene = new Three.Scene();

    const cameraManager = new CameraManager(renderer, scene);

    const orbitalCamera = P.camera();
    orbitalCamera.position.set(-250, 100, 300);
    const orbitControls = new OrbitControls(orbitalCamera, renderer.domElement);
    cameraManager.add(orbitalCamera, "1", orbitControls);

    const fpsCamera = P.camera();
    fpsCamera.position.set(400, 45, 0);
    fpsCamera.rotation.y = Math.PI / 2;
    const fpsControls = new FirstPersonControls(fpsCamera, renderer.domElement);
    fpsControls.movementSpeed = 30;
    fpsControls.lookVertical = false;
    fpsControls.lookSpeed = 0.1;
    cameraManager.add(fpsCamera, "6", fpsControls);

    build_terrain(scene);

    const ambientDayLight = new Three.AmbientLight(0xffffe0);
    scene.add(ambientDayLight);
    lightManager.add(
        ambientDayLight,
        (l) => (l.intensity = 0.5),
        (l) => (l.intensity = 0)
    );

    const ambientNightLight = new Three.AmbientLight(0x506886);
    scene.add(ambientNightLight);
    lightManager.add(
        ambientNightLight,
        (l) => (l.intensity = 0),
        (l) => (l.intensity = 0.5)
    );

    return [cameraManager, scene];
}

function main() {
    const [cameraManager, scene] = init();

    const sun = createSun();
    scene.add(sun);

    const path = trainPath();

    const railway = createRailway(path);
    railway.position.setY(37);
    scene.add(railway);

    const train = createTrain();
    scene.add(train);
    startTrainOnPath(train, path);

    const tunnel = createTunnel();
    tunnel.position.copy(path.getPointAt(0.125));
    tunnel.position.setY(46);
    scene.add(tunnel);

    const bridge = createBridge(17);
    bridge.position.copy(path.getPointAt(0.74));
    bridge.position.setY(46);
    scene.add(bridge);

    const trees: Array<[Three.Vector3, number]> = [
        [new Three.Vector3(366, 37, -115), 12],
        [new Three.Vector3(368, 37, -11), 11],
        [new Three.Vector3(445, 37, 102), 8],
        [new Three.Vector3(401, 37, 400), 20],
    ];

    trees.forEach(([p, c]) => scene.add(treePatch(p, c)));

    const lamps = placeAlongPath(path, createLamp, 7);
    lamps.position.setY(38);
    scene.add(lamps);

    const animationManager = AnimationManager.getInstance();

    LightManager.getInstance().switchDay();

    KeyboardManager.getInstance().setupKeyControls();

    const time = new Three.Clock();

    function loop() {
        const delta = time.getDelta();
        cameraManager.render(delta);

        animationManager.run(delta);

        requestAnimationFrame(loop);
    }

    loop();
}

window.onload = main;
