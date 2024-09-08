import convert from 'color-convert';

export const rgbToHex = (r, g, b) => {
    return `#${convert.rgb.hex(Number(r), Number(g), Number(b))}`
}

export const hslToHex = (h, s, l) => {
    return `#${convert.hsl.hex(Number(h), Number(s), Number(l))}`
}

export const cmykToHex = (c, m, y, k) => {
    return `#${convert.cmyk.hex(Number(c), Number(m), Number(y), Number(k))}`
}