function keydown(event) {
    players.forEach((player) => { 
        player.onKeyDown(event.keyCode)
    });
}


function keyup(event) {
    players.forEach((player) => { 
        player.onKeyRelease(event.keyCode)
    });
}


window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)