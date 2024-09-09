const koreanPattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣0-9]*$/;
const hexCodePattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

export const isValidKorean = (value) => {
    return koreanPattern.test(value)
}
export const isValidHexCode = (value) => {
    return hexCodePattern.test(value)
}

export const isValidRGB =(value) => {
    return typeof value === 'number' && value >= 0 && value <= 255;
}

export const isValidDegree = (value) => {
    return typeof value === 'number' && value >= 0 && value <= 360;
}

export const isValidPercentage = (value) => {
    return typeof value === 'number' && value >= 0 && value <= 100;
}