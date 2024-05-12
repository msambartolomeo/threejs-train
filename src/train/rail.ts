import * as Three from "three";

export function createRailway(
    scene: Three.Scene,
    path: Three.CurvePath<Three.Vector3>
) {
    const rail1 = createRail(path, 1.5);
    const rail2 = createRail(path, -1.5);
    rail1.position.setY(41);
    rail2.position.setY(41);
    const earthwork = createEarthwork(path);
    earthwork.position.setY(37);
    scene.add(earthwork);
    scene.add(rail1);
    scene.add(rail2);
}

function createRail(
    path: Three.CurvePath<Three.Vector3>,
    offset: number
): Three.Mesh {
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

    return new Three.Mesh(
        geometry,
        new Three.MeshPhongMaterial({
            color: "silver",
            shininess: 300,
        })
    );
}

function createEarthwork(path: Three.CurvePath<Three.Vector3>): Three.Mesh {
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

    return new Three.Mesh(
        geometry,
        new Three.MeshPhongMaterial({
            color: 0x665647,
            shininess: 15,
        })
    );
}
