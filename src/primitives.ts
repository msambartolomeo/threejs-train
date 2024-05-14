import * as Three from "three";

export function empty(): Three.Object3D {
    return new Three.Object3D();
}

export function cube(size: number, material: Three.Material): Three.Object3D {
    return create(material, Three.BoxGeometry, size, size, size);
}

export function plane(
    size: number,
    material: Three.Material,
    segments?: number
): Three.Object3D {
    const plane = create(
        material,
        Three.PlaneGeometry,
        size,
        size,
        segments,
        segments
    );
    plane.rotation.x = -Math.PI / 2;

    return plane;
}

export function box(
    width: number,
    height: number,
    depth: number,
    material: Three.Material
): Three.Object3D {
    return create(material, Three.BoxGeometry, width, height, depth);
}

export function circle(
    radius: number,
    material: Three.Material
): Three.Object3D {
    const circle = create(material, Three.CircleGeometry, radius);
    circle.rotation.x = -Math.PI / 2;

    return circle;
}

export function sphere(
    radius: number,
    material: Three.Material
): Three.Object3D {
    return create(material, Three.SphereGeometry, radius);
}

export function cylinder(
    radius: number,
    height: number,
    material: Three.Material
): Three.Object3D {
    return create(material, Three.CylinderGeometry, radius, radius, height);
}

export function polygon(
    radius: number,
    height: number,
    sides: number,
    material: Three.Material
): Three.Object3D {
    return create(
        material,
        Three.CylinderGeometry,
        radius,
        radius,
        height,
        sides
    );
}

export function cone(
    radius: number,
    height: number,
    material: Three.Material
): Three.Object3D {
    return create(material, Three.ConeGeometry, radius, height);
}

type GeometryConstructor = {
    new (...args: any[]): Three.BufferGeometry;
};

function create(
    material: Three.Material,
    constructor: GeometryConstructor,
    ...args: any[]
): Three.Object3D {
    const geometry = new constructor(...args);

    return new Three.Mesh(geometry, material);
}
