import { Matrix4x4 } from '../models/Matrix4x4'

export class GLUtils {
    public static getRelativeMousePosition = (event: MouseEvent, target: HTMLElement) => {
        target = target || event.target
        const rect = target.getBoundingClientRect()

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    public static OrthoCamMatrix = (target: HTMLCanvasElement, viewDistance: { near: number; far: number } = { near: 0, far: 1000 }) => {
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

    public static getRelativeCanvasMousePosition = (event: MouseEvent, target: HTMLCanvasElement) => {
        target = target || event.target
        const pos = this.getRelativeMousePosition(event, target)

        pos.x = (pos.x * target.width) / target.clientWidth
        pos.y = (pos.y * target.height) / target.clientHeight

        return pos
    }

    public static makeShader = (context: WebGL2RenderingContext, src: string, type: number) => {
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

    public static genCamera(ctx: WebGL2RenderingContext, program: WebGLProgram) {
        // Generating The ortho camera
        const proj = ctx.getUniformLocation(program, 'proj')
        if (!proj || proj < 0) {
            console.log('Failed to get the storage location of proj')
            return
        }
        const matrix = this.OrthoCamMatrix(ctx.canvas)
        ctx.uniformMatrix4fv(proj, false, matrix.values)
    }
}
