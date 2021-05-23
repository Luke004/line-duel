function handleBorderCollisions(canvas, player) {
    if (player.x > canvas.width - player.currentSize / 2) {
        player.x = canvas.width - player.currentSize / 2
        gameOver = true
    }
    else if (player.x < 0 + player.currentSize / 2) {
        player.x = 0 + player.currentSize / 2
        gameOver = true
    }
    if (player.y > canvas.height - player.currentSize / 2) {
        player.y = canvas.height - player.currentSize / 2
        gameOver = true
    }
    else if (player.y < 0 + player.currentSize / 2) {
        player.y = 0 + player.currentSize / 2
        gameOver = true
    }
}

function randomChooseNewDirection(dir1, dir2) {
    let val = Math.random() * 1;
    if (val > 0.5) return dir1
    return dir2
}

function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}