import { Entity } from '.'

export class Canvas {
    private _canvas: HTMLCanvasElement
    private _context: WebGL2RenderingContext
    private _entities: Entity[]
    private _needsUpdate: boolean

    public get needsUpdate() {
        return this._needsUpdate
    }
    public set needsUpdate(val: boolean) {
        this._needsUpdate = val
    }

    constructor(private _container: HTMLDivElement) {
        this._needsUpdate = true
        this._entities = []
        const bb = this._container.getBoundingClientRect()
        this._canvas = document.createElement('canvas')
        this._canvas.width = bb.width
        this._canvas.height = bb.height
        this._container.append(this._canvas)
        this._context = this._canvas.getContext('webgl2')!
        if (!this._context) {
            throw new Error('couldnt initialize main context')
        }

        this.context.clearColor(0, 0, 0, 1)
        this.context.enable(this.context.BLEND)
        this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE_MINUS_SRC_ALPHA)
        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT)
    }

    public get element() {
        return this._canvas
    }
    public get context() {
        return this._context
    }

    public add(entity: Entity) {
        this._entities.push(entity)
    }
    public remove(entity: Entity) {
        this._entities = this._entities.filter((e) => !Entity.Equals(e, entity))
    }

    public render() {
        if (this.needsUpdate) {
            const t0 = performance.now()
            this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT)

            for (const e of this._entities) {
                e.render(this.context)
            }

            const t1 = performance.now()
            console.log(`Call to render ${this._entities.length} entities took ${t1 - t0} milliseconds.`)
            this.needsUpdate = false
        }

        requestAnimationFrame(this.render.bind(this))
    }
}
