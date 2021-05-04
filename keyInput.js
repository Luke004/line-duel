var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

function keydown(event) {
    var key = keyMap[event.keyCode]

    player1.onKeyPress(key)
}

/*
function keyup(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = false
}
*/

window.addEventListener("keydown", keydown, false)
//window.addEventListener("keyup", keyup, false)