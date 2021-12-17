export default `#version 300 es
precision highp float;
in vec3 a_Position;
uniform mat4 proj;

in vec2 a_uv;
out vec2 vUv;

void main() {
    gl_Position = proj * vec4(a_Position, 1.0);
    vUv = a_uv;
}
`