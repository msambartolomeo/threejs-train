import * as Three from "three";
import * as M from "../materials";
import * as P from "../primitives";

export function createSleeper() {
    return P.box(3, 1, 10, M.WOOD);
}

export function createRailway(
    path: Three.CurvePath<Three.Vector3>
): Three.Object3D {
    const railway = new Three.Object3D();

    const rail1 = createRail(path, 1.5);
    const rail2 = createRail(path, -1.5);
    const earthwork = createEarthwork(path);

    rail1.position.setY(4.5);
    rail2.position.setY(4.5);

    railway.add(earthwork, rail1, rail2);

    return railway;
}

function createRail(
    path: Three.CurvePath<Three.Vector3>,
    offset: number
): Three.Object3D {
    const railShape = new Three.Shape();

    const sign = Math.sign(offset);

    railShape.moveTo(0, offset);
    railShape.lineTo(-0.2, offset);
    railShape.lineTo(-0.2, sign * 0.4 + offset);
    railShape.lineTo(-0.7, sign * 0.4 + offset);
    railShape.lineTo(-0.7, sign * 0.2 + offset);
    railShape.lineTo(-1, sign * 0.2 + offset);
    railShape.lineTo(-1, sign * 0.8 + offset);
    railShape.lineTo(-0.7, sign * 0.8 + offset);
    railShape.lineTo(-0.7, sign * 0.6 + offset);
    railShape.lineTo(-0.2, sign * 0.6 + offset);
    railShape.lineTo(-0.2, sign + offset);
    railShape.lineTo(0, sign + offset);
    railShape.lineTo(0, offset);

    const geometry = new Three.ExtrudeGeometry(railShape, {
        steps: 1000,
        bevelEnabled: false,
        extrudePath: path,
    });

    return new Three.Mesh(geometry, M.METAL);
}

function createEarthwork(path: Three.CurvePath<Three.Vector3>): Three.Object3D {
    const earthworkShape = new Three.Shape();

    earthworkShape.moveTo(0, -10);
    earthworkShape.bezierCurveTo(-2, -10, -4, -8, -4, -4);
    earthworkShape.lineTo(-4, 4);
    earthworkShape.bezierCurveTo(-4, 8, -2, 10, 0, 10);
    earthworkShape.lineTo(0, 10);
    earthworkShape.lineTo(0, -10);

    const geometry = new Three.ExtrudeGeometry(earthworkShape, {
        steps: 1000,
        bevelEnabled: false,
        extrudePath: path,
    });

    return new Three.Mesh(geometry, M.GROUND);
}
