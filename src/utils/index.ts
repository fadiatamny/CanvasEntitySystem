/* eslint-disable prettier/prettier */
import { Entity } from '../models'
import { Matrix4x4 } from '../models/Matrix4x4'

export const getRelativeMousePosition = (event: MouseEvent, target: HTMLElement) => {
    target = target || event.target
    const rect = target.getBoundingClientRect()

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

export const OrthoCamMatrix = (target: HTMLCanvasElement, viewDistance: { near: number; far: number } = { near: 0, far: 1000 }) => {
    const top = 0
    const bottom = target.height
    const left = 0
    const right = target.width
    const near: number = viewDistance.near
    const far: number = viewDistance.far

    return new Matrix4x4(
        2 / (right - left),
        0.0,
        0.0,
        0.0,
        0.0,
        2 / (top - bottom),
        0.0,
        0.0,
        0.0,
        0.0,
        2 / (far - near),
        0.0,
        -(right + left) / (right - left),
        -(top + bottom) / (top - bottom),
        -(far + near) / (far - near),
        1.0
    )
}

export const getRelativeCanvasMousePosition = (event: MouseEvent, target: HTMLCanvasElement) => {
    target = target || event.target
    const pos = getRelativeMousePosition(event, target)

    pos.x = (pos.x * target.width) / target.clientWidth
    pos.y = (pos.y * target.height) / target.clientHeight

    return pos
}

export const makeShader = (context: WebGL2RenderingContext, src: string, type: number) => {
    const shader = context.createShader(type)
    if (!shader) {
        throw new Error(`Couldnt compile shader ${Object.keys(WebGL2RenderingContext)[type]}`)
    }

    context.shaderSource(shader, src)
    context.compileShader(shader)

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error(`Error compiling shader(${Object.keys(WebGL2RenderingContext)[type]}): ${context.getShaderInfoLog(shader)}`)
        return
    }
    return shader
}
