import { Entity } from '..'
import { makeShader, normalizeToGlValue } from '../../utils'
import VertexShader from './shaders/vertex.glsl'
import FragmentShader from './shaders/vertex.glsl'

export class Box extends Entity {
    private static zIndex = 1
    private _program: WebGLProgram | null

    constructor(left: number, top: number, width: number, height: number) {
        super({ left, top, width, height })
        this._program = null
    }

    private _initShaders(ctx: WebGL2RenderingContext) {
        // Compile shaders
        const vertexShader = makeShader(ctx, VertexShader, ctx.VERTEX_SHADER)
        const fragmentShader = makeShader(ctx, FragmentShader, ctx.FRAGMENT_SHADER)

        if (!vertexShader || !fragmentShader) {
            return false
        }

        // Create program
        this._program = ctx.createProgram()
        if (!this._program) {
            return false
        }

        // Attach and link shaders to the program
        ctx.attachShader(this._program, vertexShader)
        ctx.attachShader(this._program, fragmentShader)
        ctx.linkProgram(this._program)
        if (!ctx.getProgramParameter(this._program, ctx.LINK_STATUS)) {
            console.error('Unable to initialize the shader program')
            return false
        }

        // Use program
        ctx.useProgram(this._program)
        // ctx.program = glProgram

        return true
    }

    private _getVerticies(ctx: WebGL2RenderingContext) {
        if (!this._program) {
            return -1
        }

        // Vertices
        const dim = 3
        const top = normalizeToGlValue(this.top, ctx.canvas)
        const left = normalizeToGlValue(this.left, ctx.canvas)
        const bottom = normalizeToGlValue(this.top + this.height, ctx.canvas)
        const right = normalizeToGlValue(this.left + this.width, ctx.canvas)
        const vertices = new Float32Array([
            // triangle 1
            left,
            top,
            Box.zIndex,

            right,
            top,
            Box.zIndex,

            left,
            bottom,
            Box.zIndex,

            // triagnle 2
            right,
            bottom,
            Box.zIndex,

            left,
            bottom,
            Box.zIndex,

            right,
            top,
            Box.zIndex
        ])

        // Fragment color
        const rgba = [0.0, 1, 0.0, 1.0]

        // Create a buffer object
        const vertexBuffer = ctx.createBuffer()
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object')
            return -1
        }
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer)
        ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW)

        // Assign the vertices in buffer object to a_Position variable
        const a_Position = ctx.getAttribLocation(this._program, 'a_Position')
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position')
            return -1
        }
        ctx.vertexAttribPointer(a_Position, dim, ctx.FLOAT, false, 0, 0)
        ctx.enableVertexAttribArray(a_Position)

        // Assign the color to u_FragColor variable
        const u_FragColor = ctx.getUniformLocation(this._program, 'u_FragColor')
        if (!u_FragColor || u_FragColor < 0) {
            console.log('Failed to get the storage location of u_FragColor')
            return -1
        }
        ctx.uniform4fv(u_FragColor, rgba)

        // Return number of vertices
        return vertices.length / dim
    }

    public async render(ctx: WebGL2RenderingContext) {
        if (!this._program) {
            this._initShaders(ctx)
        }

        const verticies = this._getVerticies(ctx)
        // Draw
        ctx.drawArrays(ctx.TRIANGLES, 0, verticies)
    }
}
