function createPlayerElement(name, color, size) {
    // create player circle div
    let div = document.createElement("div")
    div.id = name
    div.style.width = size * 0.95 + "px"
    div.style.height = size * 0.95 + "px"
    div.style.position = "absolute"
    div.style.borderRadius = "20px"
    div.style.backgroundColor = color
    // add it to the container
    let container = document.getElementById("container")
    container.appendChild(div)
    return div
}

function handleBorderCollisions(canvas, player) {
    if (player.x > canvas.width - player.currentSize) {
        gameOver = true
    }
    else if (player.x < 0 + player.currentSize) {
        gameOver = true
    }
    if (player.y > canvas.height - player.currentSize) {
        gameOver = true
    }
    else if (player.y < 0 + player.currentSize) {
        gameOver = true
    }
}

function spaceIsFree(ctx, x, y, radius) {
    let array_size = radius * 2 * 4     // this is the size that one array will have
    let data = new Uint8ClampedArray(array_size * 2)    // save space for 2 arrays (vertical + horizontal)
    data.set(ctx.getImageData(x - radius, y, radius * 2, 1).data)      // horizontal
    data.set(ctx.getImageData(x, y - radius, 1, radius * 2).data, array_size)      // vertical

    let b_spaceIsFree = true
    data.forEach((pixel) => {
        if (pixel != 0) {
            b_spaceIsFree = false
            return
        }
    })
    return b_spaceIsFree
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1, y1, x2, y2) {
    let a = x1 - x2
    let b = y1 - y2
    return Math.sqrt(a * a + b * b)
}

/* Checks a pixel in the canvas if it is colliding with a trail (red, blue or green) */
function checkTrailCollisions(ctx, x, y, data) {
    if (data[0] == 255 && data[1] == 0 && data[2] == 0) gameOver = true     // player crashed into red trail
    if (data[0] == 0 && data[1] == 0 && data[2] == 255) gameOver = true       // player crashed into blue trail
    if (data[0] == 0 && data[1] == 255 && data[2] == 0) gameOver = true       // player crashed into blue trail
}

function drawCircle(ctx, x, y, size, fillColor, strokeColor) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.strokeStyle = strokeColor
    ctx.stroke()
}

/*
function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top)
}
*/