export const getRelativeMousePosition = (event: MouseEvent, target: HTMLElement) => {
    target = target || event.target
    const rect = target.getBoundingClientRect()

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

export const getRelativeCanvasMousePosition = (event: MouseEvent, target: HTMLCanvasElement) => {
    target = target || event.target
    const pos = getRelativeMousePosition(event, target)

    pos.x = (pos.x * target.width) / target.clientWidth
    pos.y = (pos.y * target.height) / target.clientHeight

    return pos
}
