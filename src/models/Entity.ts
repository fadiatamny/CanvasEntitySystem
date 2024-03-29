import { v4 as uuid } from 'uuid'
import { Dictionary } from '.'

export abstract class Entity {
    public static Equals(a: Entity, b: Entity) {
        return a.id === b.id
    }

    // private eventManager: EventManager
    private id: string
    protected _data: any // compressed bitarray
    protected _top: number
    protected _left: number
    protected _width: number
    protected _height: number
    protected _opacity: number
    protected _angle: number // degree based angle
    protected _isDirty: boolean

    public get data() {
        return this._data
    }
    public get top() {
        return this._top
    }
    public get left() {
        return this._left
    }
    public get width() {
        return this._width
    }
    public get height() {
        return this._height
    }
    public get center() {
        const bottom = this.top + this.height
        const right = this.left + this.width
        return { x: (this.left + right) / 2, y: (this.top + bottom) / 2 }
    }
    public get opacity() {
        return this._opacity
    }
    public get angle() {
        return this._angle
    }
    public get isDirty() {
        return this._isDirty
    }
    public set isDirty(val: boolean) {
        this._isDirty = val
    }

    constructor(entity?: Partial<Entity>) {
        this.id = uuid()
        this._left = entity?.left ?? 0
        this._top = entity?.top ?? 0
        this._width = entity?.width ?? 0
        this._height = entity?.height ?? 0
        this._opacity = entity?.opacity ?? 1
        this._angle = entity?.angle ?? 0
        this._isDirty = true
    }

    public toJson(): Dictionary {
        return {
            data: this._data,
            top: this._top,
            left: this._left,
            width: this._width,
            height: this._height
        }
    }

    public abstract render(ctx: WebGL2RenderingContext): Promise<void>
    // public abstract translate(ctx: WebGL2RenderingContext): Promise<void>
    // public abstract scale(ctx: WebGL2RenderingContext): Promise<void>
    // public abstract rotate(ctx: WebGL2RenderingContext): Promise<void>
}
