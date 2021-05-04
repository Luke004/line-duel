function keydown(event) {
    players.forEach((player) => { 
        player.onKeyPress(event.keyCode)
    });
}

/*
function keyup(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = false
}
*/

window.addEventListener("keydown", keydown, false)
//window.addEventListener("keyup", keyup, false)