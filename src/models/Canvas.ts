import { Entity } from '.'

export class Canvas {
    private _canvas: HTMLCanvasElement
    private _context: WebGL2RenderingContext
    private _entities: Entity[]

    constructor(private _container: HTMLDivElement) {
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
        for (const e of this._entities) {
            e.render(this.context)
        }
        requestAnimationFrame(this.render.bind(this))
    }
}
