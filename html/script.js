const inputsCitizen = Array.from(document.forms["citizen"].querySelectorAll("input, select, textarea"))
const inputsTest = Array.from(document.forms["test"].querySelectorAll("input, select, textarea"))

const photoInput = document.querySelector('input[type=file]')

const formCitizen = document.forms["citizen"]
const formTest = document.forms["test"]

for (const input of [...inputsCitizen, ...inputsTest]) {
    input.addEventListener("change", () => {
        input.checkValidity()
        updateErrorMessage(input)
    })
    input.addEventListener("invalid", () => {
        updateErrorMessage(input)
    })
}

formCitizen.addEventListener("submit", (e) => {
    const isValid = formCitizen.reportValidity()

    if (!isValid)
        e.preventDefault()
})

formTest.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!formTest.reportValidity()) {
        return
    }

    formTest.disabled = true

    const answers = [5, 1, 5, 4, 2]

    for (let i = 0; i < answers.length; i++) {
        const questionInputName = "question" + (i + 1)

        if (answers[i] !== Number(formTest[questionInputName].value)) {
            formTest[questionInputName].forEach(variant => variant.setCustomValidity("Incorrect answer"))
        }
    }

    formTest.reportValidity()

    for (const radio of inputsTest) {
        radio.disabled = true
    }
})

photoInput.addEventListener("change", (e) => {
    const preview = document.querySelector('#imgPhoto')
    const file = e.currentTarget

    const reader = new FileReader()

    reader.addEventListener("loadend", () => {
        preview.src = reader.result
    })

    reader.readAsDataURL(file.files[0])
})

function updateErrorMessage(input) {
    input.setAttribute("aria-invalid", String(!input.validity.valid))

    if (input.validity.customError) {
        input.setAttribute("aria-errormessage", "error_" + input.name + "_custom")
    }

    if (input.validity.patternMismatch) {
        input.setAttribute("aria-errormessage", "error_" + input.name + "_pattern")
    }

    if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
        input.setAttribute("aria-errormessage", "error_" + input.name + "_range")
    }

    if (input.validity.tooLong || input.validity.tooShort) {
        input.setAttribute("aria-errormessage", "error_" + input.name + "_length")
    }

    if (input.validity.valueMissing) {
        input.setAttribute("aria-errormessage", "error_" + input.name + "_empty")
    }

    if (input?.type === "radio") {
        const radios = Array.from(document.querySelectorAll("input[name=" + input.name + "][type='radio']"))

        for (const radio of radios) {
            radio.setAttribute("aria-invalid", input.getAttribute("aria-invalid"))
            radio.setAttribute("aria-errormessage", input.getAttribute("aria-errormessage"))
        }
    }
}