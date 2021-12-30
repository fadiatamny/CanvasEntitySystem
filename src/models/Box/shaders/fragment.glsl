export default `#version 300 es
precision highp float;

uniform vec4 innerCol;
uniform vec4 strokeCol;
uniform float borderWidth;
uniform vec2 dims;

in vec2 vUv;
out vec4 color;

vec2 mapTo(vec2 fromStart ,vec2 fromEnd , vec2 toStart , vec2 toEnd , vec2 val ){
  vec2 slope = (toEnd - toStart) / (fromEnd - fromStart);
  vec2 res = toStart + slope * (val - fromStart);
  return res;
}

void main() {
    vec2 pixel = vUv.xy;
    vec2 borderSize = mapTo(vec2(0.0), dims, vec2(0.0) ,vec2(1.0), vec2(borderWidth));
    vec2 textureEnd = vec2(1.0 - borderSize.x, 1.0 - borderSize.y); 

    if (borderSize.x < pixel.x && borderSize.y < pixel.y &&
        pixel.x < textureEnd.x && pixel.y < textureEnd.y )
    {
        color = innerCol;
    }
    else 
    {
        color = strokeCol;
    }
}
`

