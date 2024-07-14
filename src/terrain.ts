import * as Three from "three";
import * as P from "./primitives";
import AnimationManager from "./managers/animation";

export function build_terrain(scene: Three.Scene) {
    const loader = new Three.TextureLoader().setPath("images/maps/terrain/");

    const heightMap = loader.load("height.png");
    const normalMap = loader.load("normal.png");

    const groundMaterial = new Three.MeshPhongMaterial({
        color: 0x1d5121,
        displacementMap: heightMap,
        normalMap: normalMap,
        displacementScale: 200,
        shininess: 15,
    });

    const terrain = P.plane(1024, groundMaterial, 256, false);

    terrain.receiveShadow = true;
    terrain.castShadow = false;

    terrain.rotation.x = -Math.PI / 2;

    scene.add(terrain);

    const waterMaterial = new Three.MeshPhongMaterial({
        displacementMap: heightMap,
        color: 0x88e1ff,
        specular: "silver",
        transparent: true,
        opacity: 0.9,
        shininess: 100,
    });

    let tide = 1;

    function animateWater(_: Three.Object3D, speed: number, delta: number) {
        waterMaterial.displacementScale += tide * speed * delta;
        if (Math.abs(waterMaterial.displacementScale) > 20) {
            tide *= -1;
        }
    }

    const water = P.plane(1024, waterMaterial, 256, false);

    water.receiveShadow = true;
    water.castShadow = false;

    water.position.setY(25);

    AnimationManager.getInstance().add(water, 2, animateWater);

    scene.add(water);
}
