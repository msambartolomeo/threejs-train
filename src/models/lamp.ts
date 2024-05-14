import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";
import LightManager from "../managers/light";

export function createLamp(): Three.Object3D {
    const lamp = P.empty();

    const base = P.polygon(2, 8, 5, M.LAMP);
    base.position.setY(4);
    lamp.add(base);

    const body = P.cylinder(0.75, 16, M.LAMP);
    body.position.setY(12);
    lamp.add(body);

    const holder = P.polygon(1.5, 1, 5, M.LAMP);
    holder.position.setY(20);
    lamp.add(holder);

    const bulb = P.sphere(1.75, M.LIGHT_ON);
    bulb.position.setY(22);
    lamp.add(bulb);

    const light = new Three.PointLight(0xfcf9d9, 1, 150, 0.1);
    bulb.add(light);

    const lightManager = LightManager.getInstance();

    lightManager.add(bulb as Three.Mesh, light, turnOffLight, turnOnLight);

    // turnOffLight(bulb as Three.Mesh, light);

    return lamp;
}

function turnOffLight(object: Three.Mesh, light: Three.Light) {
    light.intensity = 0;
    object.material = M.LIGHT_OFF;
}

function turnOnLight(object: Three.Mesh, light: Three.Light) {
    light.intensity = 1;
    object.material = M.LIGHT_ON;
}
