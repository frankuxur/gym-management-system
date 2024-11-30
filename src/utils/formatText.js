export default function formatText (text) {
    const newText = text.split('').map((letter, index, array) => {
        if (letter === ' ' && array[index + 1] === ' ') return ''
        return letter
    }).join('')

    return newText
}