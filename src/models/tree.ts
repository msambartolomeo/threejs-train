import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";

export function createTree(size: number): Three.Object3D {
    const tree = new Three.Object3D();

    const log = P.cone(1, 8, M.WOOD);
    log.position.y = 4;

    const leaf1 = P.sphere(2.5, M.LEAVES);
    const leaf2 = P.sphere(2.5, M.LEAVES);
    const leaf3 = P.sphere(2, M.LEAVES);

    leaf1.position.set(1, 7, -1);
    leaf2.position.set(-1, 6, 0);
    leaf3.position.set(0, 6, 1);

    tree.add(log, leaf1, leaf2, leaf3);

    tree.scale.set(size, size, size);

    return tree;
}
