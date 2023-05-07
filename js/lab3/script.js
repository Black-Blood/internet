import { createCalendar, getDateOfFirstSundayInMonth } from "./calendar.js"
import { createTable } from "./multiplication.js"
import { createClock } from "./clock.js"


const
    placeForTable = document.getElementById("placeForTable"),
    placeForCalendar = document.getElementById("placeForCalendar"),
    placeForClock = document.getElementById("placeForClock")


createTable(placeForTable)
createCalendar(placeForCalendar)
createClock(placeForClock)


const
    dateOfFirstSundayInMonth = document.getElementById("dateOfFirstSundayInMonth"),
    formSelectMonth = document.forms["formSelectMonth"],
    selectedMonth = formSelectMonth["selectedMonth"]

dateOfFirstSundayInMonth.value = getDateOfFirstSundayInMonth()

formSelectMonth.addEventListener("submit", (e) => {
    e.preventDefault()

    const selectedMonthDate = new Date(selectedMonth.value)

    createCalendar(placeForCalendar, selectedMonthDate)
    dateOfFirstSundayInMonth.value = getDateOfFirstSundayInMonth(selectedMonthDate)

})

