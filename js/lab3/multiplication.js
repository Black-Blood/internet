export function createTable(el) {
    const
        table = document.createElement("table"),
        thead = document.createElement("thead"),
        tbody = document.createElement("tbody")


    const
        rowThead = document.createElement("tr"),
        emptyCell = document.createElement("td")

    rowThead.append(emptyCell)

    for (let i = 1; i < 10; i++) {
        const th = document.createElement("th")
        th.textContent = i
        rowThead.append(th)
    }

    thead.append(rowThead)


    for (let x = 1; x < 10; x++) {
        const
            rowTbody = document.createElement("tr"),
            thRowTbody = document.createElement("th")

        thRowTbody.textContent = x
        rowTbody.append(thRowTbody)

        for (let y = 1; y < 10; y++) {
            const cell = document.createElement("td")
            cell.textContent = x * y
            rowTbody.append(cell)
        }

        tbody.append(rowTbody)
    }

    table.append(thead, tbody)
    el.append(table)

    applyStyle(table)
}

function applyStyle(table) {
    table.style.border = "2px solid #C8A2C8"

    table
        .querySelectorAll("td,th")
        .forEach(cell => {
            cell.style.width = "50px"
            cell.style.height = "50px"
            cell.style.border = "2px solid #C8A2C8"
            cell.style.textAlign = "center"
        })

    table
        .querySelectorAll("th")
        .forEach(th => {
            th.style.fontWeight = "bold"
            th.style.color = "#fff"
            th.style.backgroundColor = "#993300"
        })

    table
        .querySelectorAll("tbody td")
        .forEach(cell => {
            cell.style.color = "#fff"
            cell.style.backgroundColor = "green"
        })
}
