import * as Three from "three";

export default class LightManager {
    private static instance: LightManager = new LightManager();

    static getInstance(): LightManager {
        return this.instance;
    }

    events: Array<[() => void, () => void]> = [];

    private constructor() {}

    add(
        object: any,
        onDay: (object: any, light?: Three.Light) => void,
        onNight: (object: any, light?: Three.Light) => void
    ) {
        const d = () => onDay(object);
        const n = () => onNight(object);

        this.events.push([d, n]);
    }

    switchDay() {
        this.events.forEach(([d, _]) => d());
    }

    switchNight() {
        this.events.forEach(([_, n]) => n());
    }
}
