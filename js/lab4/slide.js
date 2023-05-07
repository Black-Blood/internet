const placeForSlide = document.getElementById("placeForSlide")

const planets = [
    "Earth.webp",
    "Jupiter.webp",
    "Mars.webp",
    "Mercury.webp",
    "Neptune.webp",
    "Pluton.webp",
    "Saturn.webp",
    "Uranus.webp",
    "Venus.webp"
]

let prevIndex = 0

placeForSlide.src = "../../assets/planets/" + planets[0]

setInterval(() => {
    let nextIndex = getRandomArbitrary(0, 8)

    while (prevIndex === nextIndex) {
        nextIndex = getRandomArbitrary(0, 8)
    }

    placeForSlide.src = "../../assets/planets/" + planets[nextIndex]
}, 2000)

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}