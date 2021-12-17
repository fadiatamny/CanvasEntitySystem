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

const t0 = performance.now()
for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.element.width
    const y = Math.random() * canvas.element.height
    canvas.add(new Box(x, y, Math.random() * canvas.element.width - x, Math.random() * canvas.element.height - y, Math.random()))
}
const t1 = performance.now()
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)
// canvas.add(box)
