import { Canvas, Dictionary } from '.'
import { getRelativeCanvasMousePosition } from '../utils'

export enum CanvasEventTypes {
    MOUSE_MOVE = 'mousemove',
    MOUSE_UP = 'mouseup',
    MOUSE_DOWN = 'mousedown'
}

export class CanvasEvents {
    private handlers: Dictionary
    constructor(private _canvas: Canvas) {
        this.handlers = {
            [CanvasEventTypes.MOUSE_DOWN]: this._mouseDown.bind(this)
        }
        this.init()
    }

    private _mouseDown(e: MouseEvent) {
        const pos = getRelativeCanvasMousePosition(e, this._canvas.element)
        const x = (pos.x / this._canvas.element.width) * 2 - 1
        const y = (pos.y / this._canvas.element.height) * -2 + 1
        // do stuff ??
    }

    public init() {
        for (const [key, value] of Object.entries(this.handlers)) {
            this._canvas.element.addEventListener(key, value)
        }
    }
    public dispose() {
        for (const [key, value] of Object.entries(this.handlers)) {
            this._canvas.element.removeEventListener(key, value)
        }
    }
}
