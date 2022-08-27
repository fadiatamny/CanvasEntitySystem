export default `#version 300 es
precision highp float;
in vec3 a_Position;
uniform mat4 proj;
uniform float angle;
uniform vec3 center;

in vec2 a_uv;
out vec2 vUv;

void main() {
    vec3 centered = a_Position - center;
    vec3 u_Position = a_Position;
    u_Position.x = (cos(angle)*centered.x)-(sin(angle)*centered.y);
    u_Position.y = (cos(angle)*centered.y)+(sin(angle)*centered.x);
    u_Position = u_Position + center;
    gl_Position = proj * vec4(u_Position, 1.0);
    vUv = a_uv;
}
`