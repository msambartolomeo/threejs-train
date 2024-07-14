import * as Three from "three";
import { loader } from "./textures";

export const TRAIN = new Three.MeshPhongMaterial({
    color: 0x7e1414,
    shininess: 100,
});

const gravel_loader = loader("gravel", 1, 1);

export const GROUND = new Three.MeshPhysicalMaterial({
    map: gravel_loader("texture.jpg"),
    normalMap: gravel_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: gravel_loader("ao.jpg"),
    roughnessMap: gravel_loader("roughtness.jpg"),
    color: 0xaaaaaa,
    // shininess: 15,
});

export const PLASTIC = new Three.MeshPhongMaterial({
    color: 0xfde700,
    shininess: 30,
});

export const RUBBER = new Three.MeshPhongMaterial({
    color: "black",
    shininess: 0,
});

const metal_loader = loader("metal", 1, 1);

export const METAL = new Three.MeshPhysicalMaterial({
    map: metal_loader("texture.jpg"),
    normalMap: metal_loader("normal.jpg"),
    normalScale: new Three.Vector2(10, 10),
    aoMap: metal_loader("ao.jpg"),
    roughnessMap: metal_loader("roughtness.jpg"),
    metalnessMap: metal_loader("metallic.jpg")
    // color: "silver",
    // shininess: 400,
});

export const WOOD = new Three.MeshPhongMaterial({
    color: 0x493a24,
    shininess: 10,
});

export const LEAVES = [
    new Three.MeshPhongMaterial({
        color: 0x448912,
        shininess: 50,
    }),
    new Three.MeshPhongMaterial({
        color: "green",
        shininess: 10,
    }),
    new Three.MeshPhongMaterial({
        color: 0xc2dc1e,
        shininess: 100,
    }),
];

export const BRICK = new Three.MeshPhongMaterial({
    color: 0x945d43,
    shininess: 50,
});

export const LAMP = new Three.MeshPhongMaterial({
    color: 0x1e1e1e,
    shininess: 70,
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
    roughnessMap: sleeper_loader("roughtness.jpg"),
    // shininess: 10,
});
