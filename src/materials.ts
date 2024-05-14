import * as Three from "three";

export const TRAIN = new Three.MeshPhongMaterial({
    color: 0x7e1414,
    shininess: 100,
});

export const GROUND = new Three.MeshPhongMaterial({
    color: 0x665647,
    shininess: 15,
});

export const PLASTIC = new Three.MeshPhongMaterial({
    color: 0xfde700,
    shininess: 30,
});

export const RUBBER = new Three.MeshPhongMaterial({
    color: "black",
    shininess: 0,
});

export const METAL = new Three.MeshPhongMaterial({
    color: "silver",
    shininess: 400,
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

export const LIGHT_OFF = new Three.MeshPhongMaterial({
    color: 0x668186,
    transparent: true,
    opacity: 0.6,
    shininess: 200,
});
