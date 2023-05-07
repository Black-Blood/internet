export function createClock(el) {
    setInterval(() => {
        const
            current = new Date(),
            hours = (current.getHours() < 10 ? "0" : "") + current.getHours(),
            minutes = (current.getMinutes() < 10 ? "0" : "") + current.getMinutes(),
            seconds = (current.getSeconds() < 10 ? "0" : "") + current.getSeconds()

        el.textContent = hours + ":" + minutes + ":" + seconds
    }, 250)
}