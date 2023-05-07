(() => {
    // Створення елементів canvas
    const canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 440
    document.body.appendChild(canvas)

    // Отримання контексту для малювання
    const ctx = canvas.getContext('2d')

    // масштабування траєкторії
    const scale = 250
    const xMin = 0.1
    const xMax = 1
    const yMin = -1
    const yMax = 1

    // розміри
    const canvasWidth = (xMax - xMin) * scale
    const canvasHeight = (yMax - yMin) * scale
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // масив точок для побудови траєкторії
    const points = []
    for (let x = xMin; x <= xMax; x += 0.1) {
        const y = Math.exp(x ** 2) + Math.log(x ** 0.5)
        points.push({ x: x * scale, y: canvasHeight - y * scale })
    }

    // текст для відображення на траєкторії
    const text = 'y = exp(x^2) + log(x^0.5)'
    const textSize = 20
    const textWidth = ctx.measureText(text).width
    const textHeight = textSize * 1.2

    // анімація мигання траєкторії та тексту
    let alpha = 0
    let index = 0
    const animate = () =>
        setTimeout(() => {
            requestAnimationFrame(animate)
            alpha = alpha >= 1 ? 0 : alpha + 0.1
            index = index >= points.length ? 0 : index + 1
            const point = points[index]
            const nextPoint = points[index + 1] || point
            const angle = Math.atan2(
                nextPoint.y - point.y,
                nextPoint.x - point.x,
            )
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            ctx.strokeStyle = `darkred`
            ctx.stoke = `darkred`
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y)
            }
            ctx.stroke()
            ctx.fillStyle = `rgba(0, 0, 255, ${alpha})`
            ctx.font = `${textSize}px Arial`
            ctx.translate(point.x, point.y)
            ctx.rotate(angle)
            ctx.fillText(text, -textWidth / 2, textHeight)
            ctx.rotate(-angle)
            ctx.translate(-point.x, -point.y)
        }, 100)

    animate()
})()