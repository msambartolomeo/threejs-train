import * as Three from "three";
import * as P from "./primitives";
import AnimationManager from "./managers/animation";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import vertexShader from "../shaders/terrain_vertex.glsl";
import fragmentShader from "../shaders/terrain_fragment.glsl";

export function build_terrain(scene: Three.Scene) {
    const loader = new Three.TextureLoader().setPath("images/maps/");

    const heightMap = loader.load("terrain/height.png");
    const normalMap = loader.load("terrain/normal.png");

    // const groundMaterial = new Three.MeshPhongMaterial({
    //     color: 0x1d5121,
    //     displacementMap: heightMap,
    //     normalMap: normalMap,
    //     displacementScale: 200,
    //     shininess: 15,
    // });

    const groundMaterial = new CustomShaderMaterial({
        baseMaterial: Three.MeshPhysicalMaterial,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            texture1: { value: loader.load("gravel/texture.jpg") },
            texture2: { value: loader.load("sleeper/texture.jpg") },
            texture3: { value: loader.load("metal/texture.jpg") },
            normal1: { value: loader.load("gravel/normal.jpg") },
            normal2: { value: loader.load("sleeper/normal.jpg") },
            normal3: { value: loader.load("metal/normal.jpg") },
            startThreshold1: { value: 0.15 },
            endThreshold1: { value: 0.2 },
            startThreshold2: { value: 0.35 },
            endThreshold2: { value: 0.5 },
            repeat1: {value: [64, 64]},
            repeat2: {value: [64, 64]},
            repeat3: {value: [64, 64]}
        },
        displacementMap: heightMap,
        displacementScale: 200,
        // normalMap: normalMap,
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
