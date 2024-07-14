import * as Three from "three";

export function loader(
    base: string,
    repeatX: number,
    repeatY: number,
    rotation: number = 0
): (path: string) => Three.Texture {
    const loader = new Three.TextureLoader().setPath(`images/maps/${base}/`);

    return (path: string) => {
        const texture = loader.load(path);
        texture.wrapS = texture.wrapT = Three.RepeatWrapping;
        texture.repeat.set(repeatX, repeatY);
        texture.rotation = rotation;
        return texture;
    };
}

export function resetUVs(object: Three.Mesh) {
    var pos = object.geometry.getAttribute('position'),
        nor = object.geometry.getAttribute('normal'),
        uvs = object.geometry.getAttribute('uv');

    for (var i = 0; i < pos.count; i++) {
        var x = 0,
            y = 0;

        var nx = Math.abs(nor.getX(i)),
            ny = Math.abs(nor.getY(i)),
            nz = Math.abs(nor.getZ(i));

        // if facing X
        if (nx >= ny && nx >= nz) {
            x = pos.getZ(i);
            y = pos.getY(i);
        }

        // if facing Y
        if (ny >= nx && ny >= nz) {
            x = pos.getX(i);
            y = pos.getZ(i);
        }

        // if facing Z
        if (nz >= nx && nz >= ny) {
            x = pos.getX(i);
            y = pos.getY(i);
        }

        uvs.setXY(i, x, y);
    }
}

