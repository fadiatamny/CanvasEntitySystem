export * from './GLUtils'

export const degrees_to_radians = (degrees: number) => {
    const pi = Math.PI
    return degrees * (pi / 180)
}
export const radians_to_degrees = (radians: number) => {
    const pi = Math.PI
    return radians * (180 / pi)
}
export const average = (array: number[]) => {
    return (
        array.reduce((sum: number, num: number) => {
            return sum + num
        }, 0) / array.length
    )
}
export const center = (points: { x: number; y: number }[]) => {
    return {
        x: average(points.map((p) => p.x)),
        y: average(points.map((p) => p.y))
    }
}
