export class Matrix4x4 {
    private _values: Float32Array
    constructor(
        m11: number,
        m21: number,
        m31: number,
        m41: number,
        m12: number,
        m22: number,
        m32: number,
        m42: number,
        m13: number,
        m23: number,
        m33: number,
        m43: number,
        m14: number,
        m24: number,
        m34: number,
        m44: number
    ) {
        this._values = new Float32Array([m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44])
    }

    public get values() {
        return this._values
    }
}
