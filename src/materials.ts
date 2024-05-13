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

export const LEAVES = new Three.MeshPhongMaterial({
    color: "green",
    shininess: 10,
});

export const BRICK = new Three.MeshPhongMaterial({
    color: 0x945d43,
    shininess: 50,
});
