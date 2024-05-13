import * as Three from "three";
import * as M from "../materials";

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

    return new Three.Mesh(geometry, M.WOOD_MATERIAL);
}
