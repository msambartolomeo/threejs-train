import * as Three from "three";

export function trainPath(): Three.CurvePath<Three.Vector3> {
    const bazierCurves = [
        [
            // NOTE: Curve
            new Three.Vector3(-210, 0, 100),
            new Three.Vector3(-290, 0, 100),
            new Three.Vector3(-290, 0, 100),
            new Three.Vector3(-290, 0, 50),
        ],
        [
            // NOTE: Line
            new Three.Vector3(-290, 0, 50),
            new Three.Vector3(-290, 0, -50),
            new Three.Vector3(-290, 0, -150),
            new Three.Vector3(-290, 0, -200),
        ],
        [
            // NOTE: Curve
            new Three.Vector3(-290, 0, -200),
            new Three.Vector3(-290, 0, -250),
            new Three.Vector3(-290, 0, -250),
            new Three.Vector3(-220, 0, -250),
        ],
        [
            // NOTE: Line
            new Three.Vector3(-220, 0, -250),
            new Three.Vector3(-100, 0, -250),
            new Three.Vector3(200, 0, -250),
            new Three.Vector3(230, 0, -250),
        ],
        [
            // NOTE: Curve
            new Three.Vector3(230, 0, -250),
            new Three.Vector3(330, 0, -250),
            new Three.Vector3(330, 0, -250),
            new Three.Vector3(330, 0, -190),
        ],
        [
            // NOTE: Line
            new Three.Vector3(330, 0, -190),
            new Three.Vector3(330, 0, -160),
            new Three.Vector3(330, 0, -100),
            new Three.Vector3(330, 0, -80),
        ],
        [
            // NOTE: Curve
            new Three.Vector3(330, 0, -80),
            new Three.Vector3(330, 0, 10),
            new Three.Vector3(400, 0, -10),
            new Three.Vector3(400, 0, 80),
        ],
        [
            // NOTE: Line
            new Three.Vector3(400, 0, 80),
            new Three.Vector3(400, 0, 130),
            new Three.Vector3(400, 0, 130),
            new Three.Vector3(400, 0, 170),
        ],
        [
            // NOTE: Curve
            new Three.Vector3(400, 0, 170),
            new Three.Vector3(400, 0, 250),
            new Three.Vector3(400, 0, 250),
            new Three.Vector3(330, 0, 250),
        ],
        [
            // NOTE: Line
            new Three.Vector3(330, 0, 250),
            new Three.Vector3(290, 0, 250),
            new Three.Vector3(190, 0, 250),
            new Three.Vector3(100, 0, 250),
        ],
        [
            // NOTE: Curve
            new Three.Vector3(100, 0, 250),
            new Three.Vector3(-10, 0, 250),
            new Three.Vector3(10, 0, 100),
            new Three.Vector3(-100, 0, 100),
        ],
        [
            // NOTE: Line
            new Three.Vector3(-100, 0, 100),
            new Three.Vector3(-160, 0, 100),
            new Three.Vector3(-160, 0, 100),
            new Three.Vector3(-210, 0, 100),
        ],
    ];

    const railPath = new Three.CurvePath<Three.Vector3>();

    bazierCurves.forEach((curve) => {
        railPath.add(new Three.CubicBezierCurve3(...curve));
    });

    return railPath;
}

export function placeAlongPath(
    path: Three.CurvePath<Three.Vector3>,
    factory: () => Three.Object3D,
    count: number,
    offset: number = 0
): Three.Object3D {
    const holder = new Three.Object3D();

    let sign = 1;

    for (let i = 0; i < count; i++) {
        const distance = i / count;

        const object = factory();
        const point = path.getPointAt(distance);
        const tangent = path.getTangentAt(distance);

        const rotation = Math.atan2(tangent.x, tangent.z);

        sign *= -1;

        object.position.setX(point.x + tangent.z * offset * sign);
        object.position.setZ(point.z - tangent.x * offset * sign);
        object.rotation.y = rotation + Math.PI / 2;

        holder.add(object);
    }

    return holder;
}
