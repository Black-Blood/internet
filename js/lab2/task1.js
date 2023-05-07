function showArrayContent(arr) {
    if (arr.length === 1) {
        return arr[0]
    }

    if (arr.length === 2) {
        return arr.join(" i ")
    }

    return arr.slice(0, -1).join(", ") + " і " + arr.at(-1)
}


function showTextWithDelay(text, delay) {
    setTimeout(() => alert(text), delay)
}

function showTextWithInterval(text, interval) {
    setInterval(() => alert(text), interval)
}

function toggleElementVisibilityWithInterval(el, interval) {
    setInterval(() =>
        el.style.visibility = el.style.visibility === "hidden"
            ? "visible"
            : "hidden"
        , interval
    )
}


export default function task() {
    const
        a = new Array("текст"),
        b = new Array("день", "ніч"),
        c = new Array("зима", "весна", "літо", "осінь")

    alert(showArrayContent(a))
    alert(showArrayContent(b))
    alert(showArrayContent(c))

    showTextWithDelay("some text with delay 2500", 2500)
    showTextWithInterval("some text with interval 5000", 5000)

    const toggle = document.getElementById("toggle")

    toggleElementVisibilityWithInterval(toggle, 1000)
}
