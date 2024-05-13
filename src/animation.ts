import * as Three from "three";

export default class Animations {
    private static instance: Animations = new Animations();

    static getInstance(): Animations {
        return this.instance;
    }

    animations: Array<(delta: number) => void> = [];

    private constructor() {}

    add(
        object: Three.Object3D,
        speed: number,
        animation: (
            object: Three.Object3D,
            speed: number,
            delta: number
        ) => void
    ) {
        const f = (delta: number) => animation(object, speed, delta);

        this.animations.push(f);
    }

    run(delta: number) {
        this.animations.forEach((f) => f(delta));
    }
}
