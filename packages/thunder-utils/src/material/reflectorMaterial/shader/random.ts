export default /* glsl */ `
float random(vec2 co) {
    float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(co.xy, vec2(a, b));
    float sn = mod(dt, 3.14);
    
    return fract(sin(sn) * c);
}

vec3 dither(vec3 color) {
    float grid_position = random(gl_FragCoord.xy);
    vec3 dither_shift_RGB = vec3(0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0);

    dither_shift_RGB = mix(2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position);

    return color + dither_shift_RGB;
}
`
