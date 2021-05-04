var canvas = new Canvas(800, 600)

var players = []

players.push(new Player("Lukas", "red", canvas.width / 2 - 100, canvas.height / 2))
players.push(new Player("Lukas2", "blue", canvas.width / 2 + 100, canvas.height / 2))

function update(progress) {
    players.forEach((player) => {
        player.update(progress)
        handleBorderCollisions(canvas, player)
    });
}

function draw() {
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    players.forEach((player) => {
        player.draw(canvas.ctx)
    });
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
