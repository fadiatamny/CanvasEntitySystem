export const getRelativeMousePosition = (event: MouseEvent, target: HTMLElement) => {
    target = target || event.target
    const rect = target.getBoundingClientRect()

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

export const normalizeToGlValue = (value: number, target: HTMLCanvasElement) => {
    value = (value * target.width) / target.clientWidth
    return value
}

export const getRelativeCanvasMousePosition = (event: MouseEvent, target: HTMLCanvasElement) => {
    target = target || event.target
    const pos = getRelativeMousePosition(event, target)

    pos.x = (pos.x * target.width) / target.clientWidth
    pos.y = (pos.y * target.height) / target.clientHeight

    return pos
}

export const makeShader = (context: WebGL2RenderingContext, src: string, type: number) => {
    const shader = context.createShader(type)
    if (!shader) {
        throw new Error('Couldnt compile shader')
    }

    context.shaderSource(shader, src)
    context.compileShader(shader)

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error('Error compiling shader: ' + context.getShaderInfoLog(shader))
        return
    }
    return shader
}
