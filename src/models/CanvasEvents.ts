import { Box, Canvas, Coordinate, Dictionary } from '.'
import { getRelativeCanvasMousePosition } from '../utils'

export enum CanvasEventTypes {
    MOUSE_MOVE = 'mousemove',
    MOUSE_UP = 'mouseup',
    MOUSE_DOWN = 'mousedown'
}

export class CanvasEvents {
    private _mDown: Coordinate | null = null
    private _handlers: Dictionary
    constructor(private _canvas: Canvas) {
        this._handlers = {
            [CanvasEventTypes.MOUSE_DOWN]: this._mouseDown.bind(this),
            [CanvasEventTypes.MOUSE_UP]: this._mouseUp.bind(this)
        }
        this.init()
    }

    private _mouseDown(e: MouseEvent) {
        this._mDown = getRelativeCanvasMousePosition(e, this._canvas.element)
    }

    private _mouseUp(e: MouseEvent) {
        if (!this._mDown) {
            return
        }
        const pos = getRelativeCanvasMousePosition(e, this._canvas.element)
        this._canvas.add(new Box(this._mDown.x, this._mDown.y, pos.x - this._mDown.x, pos.y - this._mDown.y, Math.random()))
        this._mDown = null
    }

    public init() {
        for (const [key, value] of Object.entries(this._handlers)) {
            this._canvas.element.addEventListener(key, value)
        }

        this._mDown = null
    }
    public dispose() {
        for (const [key, value] of Object.entries(this._handlers)) {
            this._canvas.element.removeEventListener(key, value)
        }

        this._mDown = null
    }
}
