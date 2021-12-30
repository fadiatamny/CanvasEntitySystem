import { Box, CanvasEvents } from './models'
import { Canvas } from './models/Canvas'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const canvasContainer: HTMLDivElement = document.createElement('div')
canvasContainer.id = 'canvas-container'
app.append(canvasContainer)

const canvas = new Canvas(canvasContainer)
canvas.render()

const events = new CanvasEvents(canvas)

// const box = new Box(200, 200, 500, 500, 0.5)

const entityCount = 10000

for (let i = 0; i < entityCount; i++) {
    const x = Math.random() * canvas.element.width
    const y = Math.random() * canvas.element.height
    canvas.add(new Box(x, y, Math.random() * canvas.element.width - x, Math.random() * canvas.element.height - y, Math.random()))
}
// canvas.add(box)
