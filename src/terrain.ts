import * as Three from "three";
import * as P from "./primitives";
import AnimationManager from "./managers/animation";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import vertexShader from "../shaders/terrain_vertex.glsl";
import fragmentShader from "../shaders/terrain_fragment.glsl";

export function build_terrain(scene: Three.Scene) {
    const loader = new Three.TextureLoader().setPath("images/maps/");

    const heightMap = loader.load("terrain/height.png");

    const groundMaterial = new CustomShaderMaterial({
        baseMaterial: Three.MeshPhysicalMaterial,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            texture1: { value: loader.load("sand/texture.jpg") },
            texture2: { value: loader.load("grass/texture.jpg") },
            texture3: { value: loader.load("snow/texture.jpg") },
            startThreshold1: { value: 0.1 },
            endThreshold1: { value: 0.185 },
            startThreshold2: { value: 0.3 },
            endThreshold2: { value: 0.45 },
            repeat1: { value: [64, 64] },
            repeat2: { value: [64, 64] },
            repeat3: { value: [64, 64] },
        },
        displacementMap: heightMap,
        displacementScale: 200,
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
