import { isValidKorean } from "./inputValidation"

export const stringFormat = (str) => {
    const keyword = str.replaceAll(' ', '')
    return (
        isValidKorean(keyword) ? keyword : keyword.toUpperCase()
    )

}