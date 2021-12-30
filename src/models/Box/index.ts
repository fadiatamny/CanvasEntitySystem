import { Entity } from '..'
import { makeShader, OrthoCamMatrix } from '../../utils'
import VertexShader from './shaders/vertex.glsl'
import FragmentShader from './shaders/fragment.glsl'

export class Box extends Entity {
    private static zIndex = 0.1
    private static _program: WebGLProgram | null = null

    private _rgb: number[]
    private _verticesCount!: number
    private _vertices!: Float32Array
    private _vUv!: Float32Array
    private _vertexDims!: number
    private _fill!: number[]
    private _color!: number[]

    constructor(left: number, top: number, width: number, height: number, opactiy = 1) {
        super({ left, top, width, height })
        this._opacity = opactiy
        this._rgb = [Math.random(), Math.random(), Math.random()]
        this.genData()
    }

    private static initShaders(ctx: WebGL2RenderingContext) {
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

        return true
    }

    private _genCamera(ctx: WebGL2RenderingContext) {
        // Generating The ortho camera
        const proj = ctx.getUniformLocation(Box._program!, 'proj')
        if (!proj || proj < 0) {
            console.log('Failed to get the storage location of proj')
            return -1
        }
        const matrix = OrthoCamMatrix(ctx.canvas)
        ctx.uniformMatrix4fv(proj, false, matrix.values)
    }

    public genData() {
        // Vertices
        this._vertexDims = 3
        const top = this.top
        const left = this.left
        const bottom = this.top + this.height
        const right = this.left + this.width

        this._vertices = new Float32Array([
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

        this._vUv = new Float32Array([
            // triangle 1
            0, 0,

            1, 0,

            0, 1,

            // triagnle 2
            1, 1,

            0, 1,

            1, 0
        ])

        this._verticesCount = this._vertices.length / this._vertexDims

        // Fragment fill
        this._fill = [...this._rgb, this.opacity]
        // Fragment color
        this._color = [...this._rgb, 1]
    }

    private _bindBuffers(ctx: WebGL2RenderingContext) {
        if (!Box._program) {
            return
        }

        // Create a buffer object
        const vertexBuffer = ctx.createBuffer()
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object')
            return
        }
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer)
        ctx.bufferData(ctx.ARRAY_BUFFER, this._vertices, ctx.STATIC_DRAW)

        // Assign the vertices in buffer object to a_Position variable
        const a_Position = ctx.getAttribLocation(Box._program, 'a_Position')
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position')
            return -1
        }
        ctx.vertexAttribPointer(a_Position, this._vertexDims, ctx.FLOAT, false, 0, 0)
        ctx.enableVertexAttribArray(a_Position)

        // Create a buffer object

        const vUvBuffer = ctx.createBuffer()
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object')
            return -1
        }
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vUvBuffer)
        ctx.bufferData(ctx.ARRAY_BUFFER, this._vUv, ctx.STATIC_DRAW)
        const attribute = ctx.getAttribLocation(Box._program, 'a_uv')
        if (attribute < 0) {
            console.log('Failed to get the storage location of a_uv')
            return -1
        }
        ctx.vertexAttribPointer(attribute, 2, ctx.FLOAT, false, 0, 0)
        ctx.enableVertexAttribArray(attribute)

        // Assign the color variables
        let uniform = ctx.getUniformLocation(Box._program, 'innerCol')
        if (!uniform || uniform < 0) {
            console.log('Failed to get the storage location of innerCol')
            return
        }
        ctx.uniform4fv(uniform, this._fill)
        uniform = ctx.getUniformLocation(Box._program, 'strokeCol')
        if (!uniform || uniform < 0) {
            console.log('Failed to get the storage location of strokeCol')
            return
        }
        ctx.uniform4fv(uniform, this._color)
        uniform = ctx.getUniformLocation(Box._program, 'borderWidth')
        if (!uniform || uniform < 0) {
            console.log('Failed to get the storage location of borderWidth')
            return
        }
        ctx.uniform1f(uniform, 5) //borderWidth)
        uniform = ctx.getUniformLocation(Box._program, 'dims')
        if (!uniform || uniform < 0) {
            console.log('Failed to get the storage location of dims')
            return
        }
        ctx.uniform2fv(uniform, new Float32Array([ctx.canvas.width, ctx.canvas.height]))
    }

    public async render(ctx: WebGL2RenderingContext) {
        if (!Box._program) {
            Box.initShaders(ctx)
        }

        this._genCamera(ctx)
        this._bindBuffers(ctx)
        this.isDirty = false

        ctx.drawArrays(ctx.TRIANGLES, 0, this._verticesCount)
    }
}
