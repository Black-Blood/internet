export function createCalendar(el, selectedMonth = null) {
    el.innerHTML = ""

    const
        table = document.createElement("table"),
        caption = document.createElement("caption"),
        thead = document.createElement("thead"),
        tbody = document.createElement("tbody"),
        rowThead = document.createElement("tr")

    caption.textContent = getCurrentMonthAndYear(selectedMonth)

    for (const weekday of getDayOfWeeks()) {
        const th = document.createElement("th")
        th.textContent = weekday
        applyStyleForDayHeader(th)
        rowThead.append(th)
    }

    thead.append(rowThead)

    for (const week of getCalendarDays(selectedMonth)) {
        const row = document.createElement("tr")

        for (const day of week) {
            const td = document.createElement("td")
            applyStylesForDay(td, day)
            td.textContent = day.day
            row.append(td)
        }

        tbody.append(row)
    }

    applyStylesForTable(table)
    applyStylesForCaption(caption)

    table.append(caption, thead, tbody)
    el.append(table)
}

function getCurrentMonthAndYear(month = null) {
    const
        currentDate = (month instanceof Date)
            ? month
            : new Date(),
        formater = new Intl.DateTimeFormat(window.navigator.language, {
            month: "long",
            year: "numeric",
        })

    return formater.format(currentDate)
}

function getDayOfWeeks() {
    const formater = new Intl.DateTimeFormat(window.navigator.language, {
        weekday: "short"
    })

    return Array
        .from(Array(7).keys())
        .map(day => formater
            .format(Date.UTC(2023, 4, day + 1))
            .toUpperCase())
}

function getCalendarDays(month = null) {
    const
        selectedMonth = (month instanceof Date)
            ? month
            : new Date(
                new Date().getFullYear(),
                new Date().getMonth()
            ),
        diff = ((selectedMonth.getDay() === 0 ? 6 : selectedMonth.getDay()) - 1) || 7,
        firstDay = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth(),
            selectedMonth.getDate() - diff
        )

    const weeks = []

    for (let week = 0; week < 6; week++) {
        const days = []

        for (let day = 0; day < 7; day++) {
            const date = new Date(firstDay.getTime() + (week * 7 + day) * 24 * 60 * 60 * 1000)

            days.push({
                day: date.getDate(),
                isCurrentMonth: date.getMonth() === selectedMonth.getMonth(),
                isWeekday: day > 4
            })
        }

        weeks.push(days)
    }

    return weeks
}

function applyStylesForDay(td, day) {
    if (!day.isCurrentMonth) {
        td.style.opacity = 0.5
    } else {
        td.style.border = "1px solid #adb5bd"
        td.style.borderRadius = "2px"
    }

    if (day.isWeekday) {
        td.style.color = "darkred"
    }

    td.style.width = "33px"
    td.style.height = "33px"
    td.style.textAlign = "center"
}

function applyStyleForDayHeader(th) {
    th.style.width = "33px"
    th.style.height = "33px"
    th.style.textAlign = "center"
}

function applyStylesForTable(table) {
    table.style.border = "1px solid #adb5bd"
    table.style.borderCollapse = "separate"
    table.style.borderSpacing = "2px"
    table.style.borderRadius = "5px"
}

function applyStylesForCaption(caption) {
    caption.style.border = "1px solid #adb5bd"
    caption.style.marginBottom = "2px"
    caption.style.borderRadius = "5px"
    caption.style.textTransform = "capitalize"
    caption.style.padding = "5px"
}

export function getDateOfFirstSundayInMonth(month = null) {
    let currentDay = month instanceof Date
        ? month
        : new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        )

    while (true) {
        if (currentDay.getDay() === 0)
            return currentDay.getDate()

        currentDay = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            currentDay.getDate() + 1
        )
    }
}
