import { CanvasEvents } from './models'
import { Canvas } from './models/Canvas'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const canvasContainer: HTMLDivElement = document.createElement('div')
canvasContainer.id = 'canvas-container'
app.append(canvasContainer)

const canvas = new Canvas(canvasContainer)
canvas.render()

const events = new CanvasEvents(canvas)
