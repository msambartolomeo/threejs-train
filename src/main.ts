import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
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
import LightManager from "./managers/light";

function init(): readonly [Three.Camera, Three.WebGLRenderer, Three.Scene] {
    const camera = new Three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    const renderer = new Three.WebGLRenderer();
    renderer.setClearColor(0xa8bbe6, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const lightManager = LightManager.getInstance();

    lightManager.add(
        renderer,
        (r) => r.setClearColor(0xa8bbe6, 1.0),
        (r) => r.setClearColor(0x17181f, 1.0)
    );

    const scene = new Three.Scene();

    // TODO: Cleanup
    camera.position.set(0, 400, 0);

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

    return [camera, renderer, scene];
}

function main() {
    const [camera, renderer, scene] = init();

    const controls = new OrbitControls(camera, renderer.domElement);

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

    const point = path.getPointAt(0);
    camera.position.set(point.x, 50, point.z + 30);
    controls.target.set(point.x, 46, point.z);

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
    const lightManager = LightManager.getInstance();

    lightManager.switchDay();

    const time = new Three.Clock();

    function render() {
        renderer.render(scene, camera);

        controls.update();

        animationManager.run(time.getDelta());

        requestAnimationFrame(render);
    }

    render();
}

window.onload = main;
