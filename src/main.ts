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

const entityCount = 10

for (let i = 0; i < entityCount; i++) {
    const x = Math.random() * canvas.element.width
    const y = Math.random() * canvas.element.height
    // // normal box no rotation
    // canvas.add(
    //     new Box({
    //         left: x,
    //         top: y,
    //         width: Math.random() * canvas.element.width - x,
    //         height: Math.random() * canvas.element.height - y,
    //         opacity: Math.random()
    //     })
    // )

    // rotated box
    canvas.add(
        new Box({
            left: x,
            top: y,
            width: Math.random() * canvas.element.width - x,
            height: Math.random() * canvas.element.height - y,
            angle: Math.random() * 360,
            opacity: Math.random()
        })
    )
}

// // CENTER BOX
// const height = 500
// const width = 500
// canvas.add(
//     new Box({
//         left: canvas.element.width / 2 - width / 2,
//         top: canvas.element.height / 2 - height / 2,
//         width,
//         height,
//         angle: 45,
//         opacity: 1
//     })
// )

canvas.needsUpdate = true
