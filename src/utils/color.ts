// @ts-nocheck
import _ from 'lodash'

class ColorUtils {
    convertToFullHex(hex) {
        if (hex.charAt(0) != '#' || hex.length >= 7) {
            return hex
        }

        return hex
            .split('')
            .map(char => (char == '#'
                ? '#'
                : char + char))
            .join('')
    }

    toColorContrast(hex) {
        const fullColor = this.convertToFullHex(hex)
        const hRed = this._hexToR(fullColor)
        const hGreen = this._hexToG(fullColor)
        const hBlue = this._hexToB(fullColor)
        const threshold = 130
        const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000

        if (cBrightness > threshold) {
            return '#000000'
        }

        return '#ffffff'
    }

    isHex(hex) {
        const reg = /^#[0-9A-F]{6}$/i
        const string = _.toString(hex)

        return reg.test(string)
    }

    _hexToR(h) {
        return parseInt(this._cutHex(h).substring(0, 2), 16)
    }

    _hexToG(h) {
        return parseInt(this._cutHex(h).substring(2, 4), 16)
    }

    _hexToB(h) {
        return parseInt(this._cutHex(h).substring(4, 6), 16)
    }

    _cutHex(h) {
        return h.charAt(0) == '#'
            ? h.substring(1, 7)
            : h
    }
}

export const colorUtils = new ColorUtils()
