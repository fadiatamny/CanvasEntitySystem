import './style.css'
import { fabric } from 'fabric'

// const app = document.querySelector<HTMLDivElement>('#app')!
// const mainCanvas = document.createElement('canvas')
// mainCanvas.id = 'fabric'
// canvas.width = 1920
// canvas.height = 1080
// app.appendChild(mainCanvas)

const canvas = new fabric.Canvas('canvas')

// clear canvas
canvas.clear()

// remove currently selected object
canvas.remove(canvas.getActiveObject())

const entityCount = 10000
const t0 = performance.now()

for (let i = 0; i < entityCount; i++) {
    const left = Math.random() * canvas.getWidth()
    const top = Math.random() * canvas.getHeight()
    const width = Math.random() * canvas.getWidth() - left
    const height = Math.random() * canvas.getHeight() - top

    canvas.add(
        new fabric.Rect({
            width,
            height,
            left,
            top,
            fill: 'rgb(255,0,0)'
        })
    )
}

const t1 = performance.now()
console.log(`Call to render ${entityCount} entities took ${t1 - t0} milliseconds.`)
