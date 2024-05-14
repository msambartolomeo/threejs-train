import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";
import AnimationManager from "../managers/animation";
import LightManager from "../managers/light";
import CameraManager from "../managers/camera";

const TRAIN_SPEED = 20;

export function createTrain(): Three.Object3D {
    const train = P.empty();

    const body = P.cylinder(3, 10, M.TRAIN);
    body.rotation.z = Math.PI / 2;
    train.add(body);

    const front = P.cylinder(4, 1.5, M.TRAIN);
    front.rotation.z = Math.PI / 2;
    front.position.x = -5.5;
    train.add(front);

    const bottomCover = P.box(12, 0.25, 7, M.TRAIN);
    bottomCover.position.set(-0.25, -3, 0);
    train.add(bottomCover);

    const chimney = P.cylinder(0.5, 3, M.TRAIN);
    chimney.position.set(-5.5, 5, 0);
    train.add(chimney);

    const cabin = createCabin();
    cabin.position.setX(8);
    train.add(cabin);

    const wheels1 = createWheels(1);
    wheels1.position.set(1, -4, -2);
    train.add(wheels1);

    const wheels2 = createWheels(-1);
    wheels2.position.set(1, -4, 2);
    train.add(wheels2);

    const bottom = P.box(10, 1.25, 2.5, M.METAL);
    bottom.position.set(0, -3.75, 0);
    train.add(bottom);

    const light = createLight();
    light.position.setX(-6.25);
    train.add(light);

    const cameraManager = CameraManager.getInstance();

    const frontCamera = P.camera();
    frontCamera.position.setY(6);
    frontCamera.rotation.y = Math.PI / 2;
    cabin.add(frontCamera);
    cameraManager.add(frontCamera, "2");

    const backCamera = frontCamera.clone();
    backCamera.position.setX(-1);
    backCamera.rotation.y = -Math.PI / 2;
    cabin.add(backCamera);
    cameraManager.add(backCamera, "3");

    return train;
}

export function startTrainOnPath(
    train: Three.Object3D,
    path: Three.CurvePath<Three.Vector3>
) {
    let distance = 0;

    function moveTrain(train: Three.Object3D, speed: number, delta: number) {
        const maxLength = path.getLength();

        if (distance > maxLength) {
            distance -= maxLength;
        }

        const point = path.getPoint(distance / maxLength);
        const tangent = path.getTangent(distance / maxLength);
        const rotation = Math.atan2(tangent.x, tangent.z);

        train.position.set(point.x, 47, point.z);
        train.rotation.y = rotation + Math.PI / 2;

        distance += speed * delta;
    }

    const animations = AnimationManager.getInstance();

    animations.add(train, TRAIN_SPEED, moveTrain);
}

function createCabin(): Three.Object3D {
    const cabin = P.empty();

    const bottom = P.box(5, 3, 7, M.TRAIN);
    bottom.position.setY(-3);
    cabin.add(bottom);

    const rightSide = P.box(4, 6, 0.25, M.TRAIN);
    rightSide.position.set(-1, 0, -2.5);
    const leftSide = rightSide.clone();
    leftSide.position.set(-1, 0, 2.5);
    const frontSide = P.box(0.25, 6, 5, M.TRAIN);
    frontSide.position.set(-3, 0, 0);
    cabin.add(rightSide, leftSide, frontSide);

    const bar1 = P.box(0.25, 10.5, 0.25, M.TRAIN);
    const bar2 = bar1.clone();
    const bar3 = bar1.clone();
    const bar4 = bar1.clone();
    bar1.position.set(1, 2.25, 2.5);
    bar2.position.set(1, 2.25, -2.5);
    bar3.position.set(-3, 2.25, 2.5);
    bar4.position.set(-3, 2.25, -2.5);
    cabin.add(bar1, bar2, bar3, bar4);

    const roof = createRoof();
    roof.position.set(-3.5, 2.2, 0);
    cabin.add(roof);

    return cabin;
}

function createRoof(): Three.Object3D {
    const roof = P.empty();
    roof.rotation.y = Math.PI / 2;

    const plasticRoofShape = new Three.Shape();

    const R = 6;
    const r = R - 0.3;
    const s = Three.MathUtils.degToRad(60);
    const e = Three.MathUtils.degToRad(120);

    plasticRoofShape.absarc(0, 0, R, s, e);
    plasticRoofShape.absarc(0, 0, r, e, s, true);

    const plasticRoofGeometry = new Three.ExtrudeGeometry(plasticRoofShape, {
        depth: 5,
        bevelEnabled: false,
    });

    const plasticRoof = new Three.Mesh(plasticRoofGeometry, M.PLASTIC);

    const metalRoofShape = new Three.Shape();

    metalRoofShape.absarc(0, 0, r, s + 0.05, e - 0.05);

    const metalroofGeometry = new Three.ExtrudeGeometry(metalRoofShape, {
        depth: 4.5,
        bevelEnabled: false,
    });

    const metalRoof = new Three.Mesh(metalroofGeometry, M.TRAIN);

    metalRoof.position.setZ(0.25);

    roof.add(plasticRoof, metalRoof);

    return roof;
}

function createWheels(side: number): Three.Object3D {
    const wheels = P.empty();

    const animations = AnimationManager.getInstance();

    const wheel1 = createWheel(side);
    const wheel2 = createWheel(side);
    wheel2.position.setX(2.5);
    const wheel3 = createWheel(side);
    wheel3.position.setX(-2.5);

    animations.add(wheel1, TRAIN_SPEED, rotateWheel);
    animations.add(wheel2, TRAIN_SPEED, rotateWheel);
    animations.add(wheel3, TRAIN_SPEED, rotateWheel);
    wheels.add(wheel1, wheel2, wheel3);

    const piston = P.cylinder(0.8, 2.5, M.RUBBER);
    piston.rotation.z = Math.PI / 2;
    piston.position.set(-5.5, 0, side * -0.2);
    wheels.add(piston);

    const bar = P.box(8, 0.25, 0.25, M.METAL);
    bar.position.x = -1;
    const wrapper = P.empty();
    wrapper.add(bar);
    animations.add(wrapper, TRAIN_SPEED, rotateBar);
    wheel1.children[0].add(wrapper);

    return wheels;
}

const WHEEL_RADIUS = 1;

function createWheel(side: number): Three.Object3D {
    const wheel = P.cylinder(WHEEL_RADIUS, 0.25, M.RUBBER);
    wheel.rotation.x = Math.PI / 2;

    const bolt1 = P.polygon(0.1, 0.2, 6, M.METAL);
    const bolt2 = P.polygon(0.1, 0.2, 6, M.METAL);
    const bolt3 = P.polygon(0.1, 0.2, 6, M.METAL);
    const bolt4 = P.polygon(0.1, 0.2, 6, M.METAL);
    const bolt5 = P.polygon(0.1, 0.2, 6, M.METAL);
    const bolt6 = P.polygon(0.1, 0.2, 6, M.METAL);

    bolt1.position.set(0, side * -0.15, 0.7);
    bolt2.position.set(0.6, side * -0.15, 0.35);
    bolt3.position.set(-0.6, side * -0.15, 0.35);
    bolt4.position.set(0, side * -0.15, -0.7);
    bolt5.position.set(0.6, side * -0.15, -0.35);
    bolt6.position.set(-0.6, side * -0.15, -0.35);

    wheel.add(bolt1, bolt2, bolt3, bolt4, bolt5, bolt6);

    return wheel;
}

function createLight(): Three.Object3D {
    const holder = P.empty();

    const bulb = P.cylinder(1, 0.5, M.LIGHT_ON);
    bulb.rotation.z = Math.PI / 2;
    holder.add(bulb);

    const target = P.empty();
    target.position.setX(-2);
    holder.add(target);

    const light = new Three.SpotLight(0xfcf9d9, 10, 250, undefined, 1, 0.2);
    light.target = target;
    holder.add(light);

    const lightManager = LightManager.getInstance();

    lightManager.add([bulb, light], turnOffLight, turnOnLight);

    return holder;
}

function turnOffLight([bulb, light]: [Three.Mesh, Three.Light]) {
    light.intensity = 0;
    bulb.material = M.LIGHT_OFF;
}

function turnOnLight([bulb, light]: [Three.Mesh, Three.Light]) {
    light.intensity = 10;
    bulb.material = M.LIGHT_ON;
}

function rotateWheel(wheel: Three.Object3D, speed: number, delta: number) {
    const angular_velocity = speed / WHEEL_RADIUS;

    wheel.rotateY(angular_velocity * delta);
}

function rotateBar(bar: Three.Object3D, speed: number, delta: number) {
    const angular_velocity = -speed / WHEEL_RADIUS;

    bar.rotateY(angular_velocity * delta);
}
