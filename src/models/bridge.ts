import * as Three from "three";
import * as M from "../materials";
import * as P from "../primitives";
import CameraManager from "../managers/camera";

const SECTION_LENGTH = 12;
const VERTICAL_LENGTH = 24;
const SEPARATION_LENGT = 20;

export function createBridge(size: number): Three.Object3D {
    const bridge = P.empty();

    for (let i = 0; i < size - 1; i++) {
        const section = createSection(false);
        section.position.setX(-i * SECTION_LENGTH);
        bridge.add(section);
    }

    const section = createSection(true);
    section.position.setX(-(size - 1) * SECTION_LENGTH);
    bridge.add(section);

    const camera = P.camera();
    camera.rotation.y = Math.PI / 2;
    bridge.add(camera);
    CameraManager.getInstance().add(camera, "5");

    return bridge;
}

function createSection(last: boolean): Three.Object3D {
    const section = P.empty();

    const left = P.empty();
    left.position.setZ(10);

    const support = createSupport();
    support.position.setY(-(SECTION_LENGTH + 5));
    left.add(support);

    const sideBeam = createBeam(VERTICAL_LENGTH);
    left.add(sideBeam);

    const top = P.empty();
    top.position.setY(VERTICAL_LENGTH / 2);
    top.rotation.x = Math.PI / 2;

    const sideTopBeam = createBeam(SEPARATION_LENGT);
    top.add(sideTopBeam);

    if (!last) {
        const downBeam = createBeam(SECTION_LENGTH);
        downBeam.rotation.z = Math.PI / 2;
        downBeam.position.set(-SECTION_LENGTH / 2, -8.7, 0);
        left.add(downBeam);

        const upBeam = downBeam.clone();
        upBeam.position.setY(VERTICAL_LENGTH / 2);
        left.add(upBeam);

        const hypotenuseBeamSide = createBeam(
            Math.sqrt(
                Math.pow(SECTION_LENGTH, 2) + Math.pow(VERTICAL_LENGTH, 2)
            )
        );
        hypotenuseBeamSide.rotation.z = -Math.atan2(
            SECTION_LENGTH,
            VERTICAL_LENGTH
        );
        hypotenuseBeamSide.position.setX(-SECTION_LENGTH / 2);

        left.add(hypotenuseBeamSide);

        const hypotenuseBeamTop = createBeam(
            Math.sqrt(
                Math.pow(SECTION_LENGTH, 2) + Math.pow(SEPARATION_LENGT, 2)
            )
        );
        hypotenuseBeamTop.rotation.z = Math.atan2(
            SECTION_LENGTH,
            SEPARATION_LENGT
        );
        hypotenuseBeamTop.position.setX(-SECTION_LENGTH / 2);
        top.add(hypotenuseBeamTop);
    }

    const right = left.clone();
    right.position.setZ(-10);

    section.add(left, right, top);

    return section;
}

function createBeam(length: number): Three.Object3D {
    const beam = P.box(0.5, length, 0.5, M.METAL);
    beam.rotation.y = Math.PI / 4;
    return P.empty().add(beam);
}

function createSupport(): Three.Object3D {
    const shape = new Three.Shape();

    const R = SECTION_LENGTH / 2 - 2;
    const D = 4;

    shape.absarc(0, 0, R, 0, Math.PI);
    shape.lineTo(-R, -R * 2);
    shape.lineTo(-R - 2, -R * 2);
    shape.lineTo(-R - 2, R * 2);
    shape.lineTo(R + 2, R * 2);
    shape.lineTo(R + 2, -R * 2);
    shape.lineTo(R, -R * 2);
    shape.lineTo(R, 0);

    const geometry = new Three.ExtrudeGeometry(shape, {
        depth: D,
        bevelEnabled: false,
    });

    const support = new Three.Mesh(geometry, M.BRICK);
    support.castShadow = true;
    support.position.setZ(-D / 2);
    return support;
}
