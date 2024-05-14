import * as Three from "three";

export default class LightManager {
    private static instance: LightManager = new LightManager();

    static getInstance(): LightManager {
        return this.instance;
    }

    events: Array<[() => void, () => void]> = [];

    private constructor() {}

    add(
        object: Three.Mesh,
        light: Three.Light,
        onDay: (object: Three.Mesh, light: Three.Light) => void,
        onNight: (object: Three.Mesh, light: Three.Light) => void
    ) {
        const d = () => onDay(object, light);
        const n = () => onNight(object, light);

        this.events.push([d, n]);
    }

    switchDay() {
        this.events.forEach(([d, _]) => d());
    }

    switchNight() {
        this.events.forEach(([_, n]) => n());
    }
}
