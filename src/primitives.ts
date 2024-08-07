import * as Three from "three";
import { resetUVs } from "./textures";

export function camera(): Three.PerspectiveCamera {
    return new Three.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
}

export function empty(): Three.Object3D {
    return new Three.Object3D();
}

export function cube(
    size: number,
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    return create(material, reset, Three.BoxGeometry, size, size, size);
}

export function plane(
    size: number,
    material: Three.Material,
    segments?: number,
    reset: boolean = true
): Three.Object3D {
    const plane = create(
        material,
        reset,
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
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    return create(material, reset, Three.BoxGeometry, width, height, depth);
}

export function circle(
    radius: number,
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    const circle = create(material, reset, Three.CircleGeometry, radius);
    circle.rotation.x = -Math.PI / 2;

    return circle;
}

export function sphere(
    radius: number,
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    return create(material, reset, Three.SphereGeometry, radius);
}

export function cylinder(
    radius: number,
    height: number,
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    return create(
        material,
        reset,
        Three.CylinderGeometry,
        radius,
        radius,
        height
    );
}

export function polygon(
    radius: number,
    height: number,
    sides: number,
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    return create(
        material,
        reset,
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
    material: Three.Material,
    reset: boolean = true
): Three.Object3D {
    return create(material, reset, Three.ConeGeometry, radius, height);
}

type GeometryConstructor = {
    new (...args: any[]): Three.BufferGeometry;
};

function create(
    material: Three.Material,
    reset: boolean,
    constructor: GeometryConstructor,
    ...args: any[]
): Three.Object3D {
    const geometry = new constructor(...args);

    const mesh = new Three.Mesh(geometry, material);

    if (reset) {
        resetUVs(mesh);
    }

    mesh.castShadow = true;

    return mesh;
}
