import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";
import LightManager from "../managers/light";
import AnimationManager from "../managers/animation";
import KeyboardManager from "../managers/keyboard";

const DAY_SPEED = 10;
const ORBIT_RADIUS = 1000;

export function createSun(): Three.Object3D {
    const material = M.SUN;
    const sun = P.sphere(100, material);

    const directionaLight = new Three.DirectionalLight("white", 2);
    sun.add(directionaLight);
    sun.position.set(ORBIT_RADIUS, 0, -500);

    const lightManager = LightManager.getInstance();

    let angle = 0;

    lightManager.add(
        [sun, directionaLight],
        ([s, l]) => {
            angle = 0;
            s.position.set(ORBIT_RADIUS, 0, -500);
            s.visible = true;
            l.intensity = 2;
        },
        ([s, l]) => {
            s.position.set(-ORBIT_RADIUS, 0, -500);
            angle = Math.PI;
            s.visible = false;
            l.intensity = 0;
        }
    );

    const START_HUE = 25;
    const END_HUE = 45;

    function moveSun(sun: Three.Mesh, speed: number, delta: number) {
        if (angle > 2 * Math.PI) {
            angle -= 2 * Math.PI;
            lightManager.switchDay();
        }

        const new_angle = angle + (speed / ORBIT_RADIUS) * delta;

        if (angle < Math.PI && new_angle > Math.PI) {
            lightManager.switchNight();
        }

        const y = Math.sin(angle) * ORBIT_RADIUS;
        const x = Math.cos(angle) * ORBIT_RADIUS;

        sun.position.setX(x);
        sun.position.setY(y);

        angle = new_angle;

        const hue = START_HUE + Math.sin(angle) * (END_HUE - START_HUE);

        material.emissive.setHSL(hue / 360, 0.7, 0.55);
        directionaLight.color.setHSL(hue / 360, 0.7, 0.55);
    }

    const animations = AnimationManager.getInstance();

    animations.add(sun, DAY_SPEED, moveSun as any);

    const keyboard = KeyboardManager.getInstance();

    keyboard.add("d", () => change(angle, lightManager));

    return sun;
}

function change(angle: number, manager: LightManager) {
    if (angle < Math.PI) {
        manager.switchNight();
    } else {
        manager.switchDay();
    }
}
