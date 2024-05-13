import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";

export function createTree(size: number, material: number): Three.Object3D {
    const tree = new Three.Object3D();

    const log = P.cone(1, 10, M.WOOD);
    log.position.y = 4;

    const leaf1 = P.sphere(2.5, M.LEAVES[material % M.LEAVES.length]);
    const leaf2 = P.sphere(2.5, M.LEAVES[material % M.LEAVES.length]);
    const leaf3 = P.sphere(2, M.LEAVES[material % M.LEAVES.length]);

    leaf1.position.set(1, 7, -1);
    leaf2.position.set(-1, 6, 0);
    leaf3.position.set(0, 6, 1);

    tree.add(log, leaf1, leaf2, leaf3);

    tree.scale.set(size, size, size);

    return tree;
}

export function treePatch(
    position: Three.Vector3,
    size: number
): Three.Object3D {
    const trees = new Three.Object3D();
    trees.position.copy(position);

    for (let i = 1; i <= size; i++) {
        const treeSize = (Math.pow(position.x + position.y + i, i) % 4) + 1;
        const tree = createTree(treeSize + 1, i);

        const offsetX =
            ((Math.pow(position.x + i, i) *
                Math.pow(-1, i + (position.x % 2)) *
                i) %
                (size * 10)) %
            100;
        const offsetZ =
            ((Math.pow(position.z + i, i) *
                Math.pow(-1, i + (position.z % 2)) *
                i) %
                (size * 10)) %
            100;

        tree.position.set(offsetX, 0, offsetZ);
        tree.rotation.y = Three.MathUtils.degToRad(
            Math.abs(offsetX) + Math.abs(offsetZ) * i
        );

        trees.add(tree);
    }

    return trees;
}
