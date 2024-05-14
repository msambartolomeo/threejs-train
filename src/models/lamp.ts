import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";

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

    return lamp;
}
