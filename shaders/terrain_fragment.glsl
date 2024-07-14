uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;

uniform float startThreshold1;
uniform float endThreshold1;
uniform float startThreshold2;
uniform float endThreshold2;

uniform vec2 repeat1;
uniform vec2 repeat2;
uniform vec2 repeat3;

varying vec2 vUv;
varying float vDisplacement;

float project_on_range(float value, float range_start, float range_end) {
    if (value <= range_start) return 0.0;
    if (value >= range_end) return 1.0;
    return (value-range_start)/(range_end-range_start);
}

vec4 repeat_texture(sampler2D texture, vec2 vuv, vec2 repeat) {
    vec2 uv = fract(vuv * repeat);
    vec2 smooth_uv = repeat * vuv;
    vec4 duv = vec4(dFdx(smooth_uv), dFdy(smooth_uv));
    return textureGrad(texture, uv, duv.xy, duv.zw);
}

void main() {
    vec4 botTxt = repeat_texture(texture1, vUv, repeat1);
    vec4 midTxt = repeat_texture(texture2, vUv, repeat2);
    vec4 topTxt = repeat_texture(texture3, vUv, repeat3);

    csm_DiffuseColor = mix(botTxt, mix(midTxt, topTxt, project_on_range(vDisplacement, startThreshold2, endThreshold2)), project_on_range(vDisplacement, startThreshold1, endThreshold1));
}