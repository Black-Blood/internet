function getPositiveNumber(message) {
    while (true) {
        const number = Number(prompt(message))

        if (number > 0)
            return number

        alert("Введені дані не є правильними")
    }
}

export default function task() {
    const
        num1 = getPositiveNumber("Введіть додатнє ціле число №1:"),
        num2 = getPositiveNumber("Введіть додатнє ціле число №2:")

    const
        minNum = Math.min(num1, num2),
        maxNum = Math.max(num1, num2)

    const
        integerPart = Math.floor(maxNum / minNum)

    const
        result = []

    for (let i = 1; i < minNum; i++)
        if (i % integerPart === 0)
            result.push(i)

    alert(
        result.length > 0
            ? `Числа, що діляться на цілу частину частки ${maxNum} і ${minNum} без залишку: ${result.join(', ')}`
            : `Немає чисел, що діляться на цілу частину частки ${maxNum} і ${minNum} без залишку`
    )
}