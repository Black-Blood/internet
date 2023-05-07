(() => {

    // Створення елементів canvas
    const canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 440
    document.body.appendChild(canvas)

    // Отримання контексту для малювання
    const context = canvas.getContext('2d')

    // Намалювати фон зеленим кольором
    context.fillStyle = 'green'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Намалювати червоний трикутник в правому нижньому кутку
    context.beginPath()
    context.moveTo(canvas.width - 50, canvas.height - 50)
    context.lineTo(canvas.width, canvas.height - 50)
    context.lineTo(canvas.width, canvas.height)
    context.fillStyle = 'red'
    context.fill()

    // Намалювати синій прямокутник в лівому нижньому кутку
    context.fillStyle = 'blue'
    context.fillRect(0, canvas.height - 100, 100, 100)

    // Намалювати коричневу кульку, що відскакує від прямокутника
    let x = canvas.width - 50
    let y = canvas.height - 50
    let dx = -5
    let dy = -0.6
    const radius = 10
    context.beginPath()
    context.fillStyle = 'brown'
    context.arc(x, y, radius, 0, Math.PI * 2, false)
    context.fill()

    function animate() {
        if (y >= 10) {
            requestAnimationFrame(animate)
        }

        // Оновити позицію кульки
        x += dx
        y += dy
        // Якщо кулька доторкається до краю canvas, змінити напрямок руху
        if (x + radius > canvas.width || x - radius < 0) {
            dx = -dx
        }
        if (y + radius > canvas.height || y - radius < 0) {
            dy = -dy
        }
        // Якщо кулька доторкається до прямокутника, змінити напрямок руху
        if (x - radius < 100 && y + radius > canvas.height - 100) {
            dx = -dx
        }
        // Намалювати кульку
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = 'green'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.moveTo(canvas.width - 50, canvas.height - 50)
        context.lineTo(canvas.width, canvas.height - 50)
        context.lineTo(canvas.width, canvas.height)
        context.fillStyle = 'red'
        context.fill()
        context.fillStyle = 'blue'
        context.fillRect(0, canvas.height - 100, 100, 100)
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2, false)
        context.fillStyle = 'brown'
        context.fill()
    }

    animate()
})()