import * as Three from "three";
import * as P from "../primitives";
import * as M from "../materials";

export function createTrain(): Three.Object3D {
    const train = new Three.Object3D();

    const body = P.cylinder(3, 10, M.TRAIN_MATERIAL);
    body.rotation.z = Math.PI / 2;
    train.add(body);

    const front = P.cylinder(4, 1.5, M.TRAIN_MATERIAL);
    front.rotation.z = Math.PI / 2;
    front.position.x = -5.5;
    train.add(front);

    const bottom = P.box(12, 0.25, 7, M.TRAIN_MATERIAL);
    bottom.position.set(-0.25, -3, 0);
    train.add(bottom);

    const chimney = P.cylinder(0.5, 3, M.TRAIN_MATERIAL);
    chimney.position.set(-5.5, 5, 0);
    train.add(chimney);

    const cabin = createCabin();
    cabin.position.setX(8);
    train.add(cabin);

    return train;
}

function createCabin(): Three.Object3D {
    const cabin = new Three.Object3D();

    const bottom = P.box(5, 3.5, 7, M.TRAIN_MATERIAL);
    bottom.position.setY(-3);
    cabin.add(bottom);

    const rightSide = P.box(4, 6, 0.25, M.TRAIN_MATERIAL);
    rightSide.position.set(-1, 0, -2.5);
    const leftSide = rightSide.clone();
    leftSide.position.set(-1, 0, 2.5);
    const frontSide = P.box(0.25, 6, 5, M.TRAIN_MATERIAL);
    frontSide.position.set(-3, 0, 0);
    cabin.add(rightSide, leftSide, frontSide);

    const bar1 = P.box(0.25, 10.5, 0.25, M.TRAIN_MATERIAL);
    const bar2 = bar1.clone();
    const bar3 = bar1.clone();
    const bar4 = bar1.clone();
    bar1.position.set(1, 2.25, 2.5);
    bar2.position.set(1, 2.25, -2.5);
    bar3.position.set(-3, 2.25, 2.5);
    bar4.position.set(-3, 2.25, -2.5);
    cabin.add(bar1, bar2, bar3, bar4);

    const roof = createRoof();
    roof.position.set(-3.5, 2.2, 0);
    cabin.add(roof);

    return cabin;
}

function createRoof(): Three.Object3D {
    const roof = new Three.Object3D();
    roof.rotation.y = Math.PI / 2;

    const plasticRoofShape = new Three.Shape();

    const R = 6;
    const r = R - 0.3;
    const s = Three.MathUtils.degToRad(60);
    const e = Three.MathUtils.degToRad(120);

    plasticRoofShape.absarc(0, 0, R, s, e);
    plasticRoofShape.absarc(0, 0, r, e, s, true);

    const plasticRoofGeometry = new Three.ExtrudeGeometry(plasticRoofShape, {
        depth: 5,
        bevelEnabled: false,
    });

    const plasticRoof = new Three.Mesh(plasticRoofGeometry, M.PLASTIC_MATERIAL);

    const metalRoofShape = new Three.Shape();

    metalRoofShape.absarc(0, 0, r, s + 0.05, e - 0.05);

    const metalroofGeometry = new Three.ExtrudeGeometry(metalRoofShape, {
        depth: 4.5,
        bevelEnabled: false,
    });

    const metalRoof = new Three.Mesh(metalroofGeometry, M.TRAIN_MATERIAL);

    metalRoof.position.setZ(0.25);

    roof.add(plasticRoof, metalRoof);

    return roof;
}
