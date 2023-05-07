function getLastName() {
    const lastNameRegExp = /^[А-Яа-яіІїЇєЄ`]{2,}$/

    while (true) {
        const lastName = prompt("Введіть прізвище:")

        if (lastNameRegExp.test(lastName))
            return lastName

        alert("Введені дані не є правильними")
    }
}

function getGroupNumber() {
    while (true) {
        const groupNumber = Number(prompt("Введіть номер групи:"))

        if (groupNumber > 0)
            return groupNumber

        alert("Введені дані не є правильними")
    }
}

function getGrade(score) {
    if (score >= 7) return "відмінно"

    if (score >= 5) return "добре"

    if (score >= 3) return "задовільно"

    return "незадовільно"
}

class Question {
    #questionText
    #correctAnswer

    constructor(questionText, correctAnswer) {
        this.#correctAnswer = correctAnswer
        this.#questionText = questionText
    }

    get questionText() {
        return this.#questionText
    }

    check(variant) {
        return this.#correctAnswer === variant
    }
}

export default function task() {
    const lastName = getLastName()
    const groupNumber = getGroupNumber()

    const questions = [
        new Question("Цикл for-of використовується для ітерації по значеннях масиву?", false),
        new Question("Цикл while виконується, доки умова є істинною?", true),
        new Question("Цикл do-while виконується хоча б один раз?", true),
        new Question("Цикл forEach використовується для ітерації по властивостях об'єкта?", false),
        new Question("Цикл for-in використовується для ітерації по властивостях об'єкта?", true),
        new Question("Цикл break використовується для припинення виконання циклу?", false),
        new Question("Цикл continue використовується для переходу до наступної ітерації циклу?", false),
        new Question("Цикл for дозволяє повторювати блок коду декілька разів?", true),
    ]

    let score = 0

    questions.forEach(q => score +=
        q.check(confirm(q.questionText))
            ? 1
            : 0
    )

    const grade = getGrade(score)

    alert(`Студент ${lastName} з групи ${groupNumber}, ви здали тест на ${score} з 8, отримавши оцінку "${grade}"`)
}
