import * as Three from "three";

export function createRailway(
    scene: Three.Scene,
    path: Three.CurvePath<Three.Vector3>
) {
    const rail1 = createRail(path, 1);
    const rail2 = createRail(path, -1);
    rail1.position.setY(40);
    rail2.position.setY(40);

    scene.add(rail1);
    scene.add(rail2);
}

function createRail(
    path: Three.CurvePath<Three.Vector3>,
    offset: number
): Three.Mesh {
    const railShape = new Three.Shape();

    railShape.moveTo(-0, 0 + offset);
    railShape.lineTo(-0.2, 0 + offset);
    railShape.lineTo(-0.2, 0.4 + offset);
    railShape.lineTo(-0.7, 0.4 + offset);
    railShape.lineTo(-0.7, 0.2 + offset);
    railShape.lineTo(-1, 0.2 + offset);
    railShape.lineTo(-1, 0.8 + offset);
    railShape.lineTo(-0.7, 0.8 + offset);
    railShape.lineTo(-0.7, 0.6 + offset);
    railShape.lineTo(-0.2, 0.6 + offset);
    railShape.lineTo(-0.2, 1 + offset);
    railShape.lineTo(-0, 1 + offset);
    railShape.lineTo(-0, 0 + offset);

    const geometry = new Three.ExtrudeGeometry(railShape, {
        steps: 1000,
        bevelEnabled: false,
        extrudePath: path,
    });

    const rail = new Three.Mesh(
        geometry,
        new Three.MeshPhongMaterial({
            color: "silver",
            shininess: 300,
        })
    );

    return rail;
}
