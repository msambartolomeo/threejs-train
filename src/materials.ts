import * as Three from "three";
import { loader } from "./textures";

const train_loader = loader("train", 2, 2);

export const TRAIN = new Three.MeshPhysicalMaterial({
    map: train_loader("texture.jpg"),
    normalMap: train_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: train_loader("ao.jpg"),
    roughnessMap: train_loader("roughness.jpg"),
    metalnessMap: train_loader("metallic.jpg"),
    color: 0x7e1414,
    // shininess: 100,
});

const gravel_loader = loader("gravel", 1, 1);

export const GROUND = new Three.MeshPhysicalMaterial({
    map: gravel_loader("texture.jpg"),
    normalMap: gravel_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: gravel_loader("ao.jpg"),
    roughnessMap: gravel_loader("roughness.jpg"),
    color: 0xaaaaaa,
    // shininess: 15,
});

export const PLASTIC = new Three.MeshPhongMaterial({
    color: 0xfde700,
    shininess: 30,
});

const metal_loader = loader("metal", 1, 1);

export const RUBBER = new Three.MeshPhysicalMaterial({
    map: metal_loader("texture.jpg"),
    normalMap: metal_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: metal_loader("ao.jpg"),
    roughnessMap: metal_loader("roughness.jpg"),
    metalnessMap: metal_loader("metallic.jpg"),
    color: "black",
    // shininess: 0,
});


export const METAL = new Three.MeshPhysicalMaterial({
    map: metal_loader("texture.jpg"),
    normalMap: metal_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: metal_loader("ao.jpg"),
    roughnessMap: metal_loader("roughness.jpg"),
    metalnessMap: metal_loader("metallic.jpg"),
    // color: "silver",
    // shininess: 400,
});

const wood_loader = loader("trunk", 4, 4);

export const WOOD = new Three.MeshPhysicalMaterial({
    map: wood_loader("texture.jpg"),
    normalMap: wood_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: wood_loader("ao.jpg"),
    roughnessMap: wood_loader("roughness.jpg"),
    // color: 0x493a24,
    // shininess: 10,
});

const leaves1_loader = loader("leaves2", 2, 2);
const leaves2_loader = loader("leaves1", 6, 6);

export const LEAVES = [
    new Three.MeshPhysicalMaterial({
        map: leaves1_loader("texture.jpg"),
        normalMap: leaves1_loader("normal.jpg"),
        normalScale: new Three.Vector2(5, 5),
        aoMap: leaves1_loader("ao.jpg"),
        roughnessMap: leaves1_loader("roughness.jpg"),
        color: 0x448912,
        // shininess: 50,
    }),
    new Three.MeshPhysicalMaterial({
        map: leaves2_loader("texture.jpg"),
        normalMap: leaves2_loader("normal.jpg"),
        normalScale: new Three.Vector2(5, 5),
        aoMap: leaves2_loader("ao.jpg"),
        roughnessMap: leaves2_loader("roughness.jpg"),
        color: "green",
        // shininess: 10,
    }),
    new Three.MeshPhysicalMaterial({
        map: leaves2_loader("texture.jpg"),
        normalMap: leaves2_loader("normal.jpg"),
        normalScale: new Three.Vector2(5, 5),
        aoMap: leaves2_loader("ao.jpg"),
        roughnessMap: leaves2_loader("roughness.jpg"),
        color: 0xc2dc1e,
        // shininess: 100,
    }),
];

const brick_loader = loader("brick", 0.1, 0.1);

export const BRICK = new Three.MeshPhysicalMaterial({
    map: brick_loader("texture.jpg"),
    normalMap: brick_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: brick_loader("ao.jpg"),
    roughnessMap: brick_loader("roughness.jpg"),
    metalnessMap: brick_loader("metallic.jpg"),
    // color: 0x945d43,
    // shininess: 50,
});

export const LAMP = new Three.MeshPhysicalMaterial({
    map: metal_loader("texture.jpg"),
    normalMap: metal_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: metal_loader("ao.jpg"),
    roughnessMap: metal_loader("roughness.jpg"),
    metalnessMap: metal_loader("metallic.jpg"),
    color: 0x1e1e1e,
    // shininess: 70,
});

export const LIGHT_ON = new Three.MeshPhongMaterial({
    emissive: 0xfff9a0,
    color: 0xfcf9d9,
    shininess: 10000,
});

export const SUN = new Three.MeshPhongMaterial({
    emissive: 0xff9955,
    color: 0xff9955,
    shininess: 10000,
});

export const LIGHT_OFF = new Three.MeshPhongMaterial({
    color: 0x668186,
    transparent: true,
    opacity: 0.6,
    shininess: 200,
});

const sleeper_loader = loader("sleeper", 0.7, 0.7);

export const SLEEPER = new Three.MeshPhysicalMaterial({
    map: sleeper_loader("texture.jpg"),
    normalMap: sleeper_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: sleeper_loader("ao.jpg"),
    roughnessMap: sleeper_loader("roughness.jpg"),
    // shininess: 10,
});
