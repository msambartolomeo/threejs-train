import * as Three from "three";

export function createRail(
    scene: Three.Scene,
    path: Three.CurvePath<Three.Vector3>
) {
    const railShape = new Three.Shape();

    railShape.moveTo(0, 0);
    railShape.lineTo(15, 0);
    railShape.lineTo(15, 15);
    railShape.lineTo(0, 15);
    railShape.lineTo(0, 0);

    const extrudeSettings = {
        steps: 1000,
        bevelEnabled: false,
        extrudePath: path,
    };

    const geometry = new Three.ExtrudeGeometry(railShape, extrudeSettings);

    const rail = new Three.Mesh(
        geometry,
        new Three.MeshPhongMaterial({ color: "green" })
    );

    rail.position.setY(50);

    scene.add(rail);
}
