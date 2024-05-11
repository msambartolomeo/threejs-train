import * as Three from "three";
import * as P from "./primitives";

export function build_terrain(scene: Three.Scene) {
    const loader = new Three.TextureLoader().setPath("images/maps/terrain/");

    const heightMap = loader.load("height.png");
    const normalMap = loader.load("normal.png");

    const groundMaterial = new Three.MeshPhongMaterial({
        color: 0x1d5121,
        displacementMap: heightMap,
        normalMap: normalMap,
        displacementScale: 200,
    });

    const terrain = P.plane(1024, groundMaterial, 256);

    terrain.rotation.x = -Math.PI / 2;

    scene.add(terrain);

    const waterMaterial = new Three.MeshPhongMaterial({
        color: 0x88e1ff,
        shininess: 100,
    });

    const water = P.plane(1024, waterMaterial);
    water.position.setY(30);

    scene.add(water);
}
