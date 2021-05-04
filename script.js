var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
ctx.fillRect(20, 20, 20, 20);


const width = 800
const height = 600

var state = {
    x: (width / 2),
    y: (height / 2),
    currentKey: 'up'
}

var speed = 0.1



function update(progress) {
    console.log(state.currentKey)

    switch (state.currentKey) {
        case 'up':
            state.y -= progress * speed
            break
        case 'down':
            state.y += progress * speed
            break
        case 'left':
            state.x -= progress * speed
            break
        case 'right':
            state.x += progress * speed
            break
    }


    handleBorderCollisions()
}

function handleBorderCollisions() {
    if (state.x > width) {
        state.x = width
        state.currentKey = randomChooseNewDirection('up', 'down')
    }
    else if (state.x < 0) {
        state.x = 0
        state.currentKey = randomChooseNewDirection('up', 'down')
    }
    if (state.y > height) {
        state.y = height
        state.currentKey = randomChooseNewDirection('left', 'right')
    }
    else if (state.y < 0) {
        state.y = 0
        state.currentKey = randomChooseNewDirection('left', 'right')
    }
}

function randomChooseNewDirection(dir1, dir2) {
    let val = Math.random() * 1;
    if (val > 0.5) return dir1
    return dir2
}

function draw() {
    //ctx.clearRect(0, 0, width, height)

    ctx.fillRect(state.x - 5, state.y - 5, 10, 10)
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

var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

function keydown(event) {
    var key = keyMap[event.keyCode]
    if (isKeyAllowed(key)) {
        state.currentKey = key
    }
}

function isKeyAllowed(key) {
    switch (state.currentKey) {
        case 'right':
            if (key == 'left') return false
            return true
        case 'left':
            if (key == 'right') return false
            return true
        case 'up':
            if (key == 'down') return false
            return true
        case 'down':
            if (key == 'up') return false
            return true
    }
    return true
}

/*
function keyup(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = false
}
*/

window.addEventListener("keydown", keydown, false)
//window.addEventListener("keyup", keyup, false)