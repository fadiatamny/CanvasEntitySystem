import { v4 as uuid } from 'uuid'
import { Dictionary } from '.'

export abstract class Entity {
    public static Equals(a: Entity, b: Entity) {
        return a.id === b.id
    }

    // private eventManager: EventManager
    private id: string
    protected _data: any
    protected _top: number
    protected _left: number
    protected _width: number
    protected _height: number

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

    constructor(entity?: Partial<Entity>) {
        this.id = uuid()
        this._left = entity?.left ?? 0
        this._top = entity?.top ?? 0
        this._width = entity?.width ?? 0
        this._height = entity?.height ?? 0
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
