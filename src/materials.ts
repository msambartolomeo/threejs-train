import * as Three from "three";

export const TRAIN_MATERIAL = new Three.MeshPhongMaterial({
    color: 0x7e1414,
    shininess: 100,
});

export const PLASTIC_MATERIAL = new Three.MeshPhongMaterial({
    color: 0xfde700,
    shininess: 30,
});

export const RUBBER_MATERIAL = new Three.MeshPhongMaterial({
    color: "black",
    shininess: 0,
});

export const METAL_MATERIAL = new Three.MeshPhongMaterial({
    color: "silver",
    shininess: 400,
});

export const WOOD_MATERIAL = new Three.MeshPhongMaterial({
    color: 0x493a24,
    shininess: 10,
});

export const BRICK_MATERIAL = new Three.MeshPhongMaterial({
    color: 0x945d43,
    shininess: 50,
});
