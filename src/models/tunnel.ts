import * as Three from "three";
import * as M from "../materials";
import * as P from "../primitives";
import CameraManager from "../managers/camera";

export function createTunnel(): Three.Object3D {
    const shape = new Three.Shape();

    const R = 20;
    const r = R - 4;
    const s = Three.MathUtils.degToRad(0);
    const e = Three.MathUtils.degToRad(180);

    shape.absarc(0, 0, R, s, e);
    shape.lineTo(-R, -R / 2);
    shape.lineTo(-r, -R / 2);
    shape.absarc(0, 0, r, e, s, true);
    shape.lineTo(r, -R / 2);
    shape.lineTo(R, -R / 2);

    const geometry = new Three.ExtrudeGeometry(shape, {
        depth: 100,
        bevelEnabled: false,
    });

    const tunnel = new Three.Mesh(geometry, M.STONE);

    tunnel.castShadow = true

    const camera = P.camera();
    camera.rotation.y = Math.PI;
    tunnel.add(camera);
    CameraManager.getInstance().add(camera, "4");

    return tunnel;
}
