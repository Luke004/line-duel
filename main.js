var canvas = new Canvas(800, 600)

var players = []

players.push(new Player("Lukas", "red", canvas.width / 2 - 100, canvas.height / 2))
players.push(new Player("Lukas2", "blue", canvas.width / 2 + 100, canvas.height / 2))

var gameOver = false

function update(progress) {
    if (gameOver) return

    let allTrailRects = []

    players.forEach((player) => {
        player.update(progress)
        handleBorderCollisions(canvas, player)

        let trailRects = player.getTrailRects()
        allTrailRects = allTrailRects.concat(trailRects)
    })

    // check the losing condition
    players.forEach((player) => {
        let intersection = false
        for (let i = 0; i < allTrailRects.length; ++i) {
            if (intersectRect(player.getPlayerRect(), allTrailRects[i])) {
                intersection = true
                break
            }
        }
        if (intersection) {
            alert("GAME OVER: Player '" + player.name + "' has lost!")
            gameOver = true
        }
    })

}

function draw() {
    if (gameOver) return
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    players.forEach((player) => {
        player.draw(canvas.ctx)
    })
}

function loop(timestamp) {
    let progress = timestamp - lastRender

    update(progress)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)
