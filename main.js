var canvas = new Canvas(800, 600)
var player1 = new Player("Lukas", "red", canvas.width / 2, canvas.height / 2)


function update(progress) {
    handleBorderCollisions(canvas, player1)
    player1.update(progress)
}


function draw() {
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    player1.draw(canvas.ctx)
}

function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)
