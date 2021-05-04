function isKeyAllowed(currentKey, nextKey) {
    switch (currentKey) {
        case 'right':
            if (nextKey == 'left') return false
            return true
        case 'left':
            if (nextKey == 'right') return false
            return true
        case 'up':
            if (nextKey == 'down') return false
            return true
        case 'down':
            if (nextKey == 'up') return false
            return true
    }
    return true
}

function handleBorderCollisions(canvas, player) {
    if (player.x > canvas.width - player.currentSize / 2) {
        player.x = canvas.width - player.currentSize / 2
        player.currentKey = randomChooseNewDirection('up', 'down')
    }
    else if (player.x < 0 + player.currentSize / 2) {
        player.x = 0 + player.currentSize / 2
        player.currentKey = randomChooseNewDirection('up', 'down')
    }
    if (player.y > canvas.height - player.currentSize / 2) {
        player.y = canvas.height - player.currentSize / 2
        player.currentKey = randomChooseNewDirection('left', 'right')
    }
    else if (player.y < 0 + player.currentSize / 2) {
        player.y = 0 + player.currentSize / 2
        player.currentKey = randomChooseNewDirection('left', 'right')
    }
}

function randomChooseNewDirection(dir1, dir2) {
    let val = Math.random() * 1;
    if (val > 0.5) return dir1
    return dir2
}