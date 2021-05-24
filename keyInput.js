function keydown(event) {
    event.preventDefault()
    players.forEach((player) => { 
        player.onKeyDown(event.keyCode)
    })
}


function keyup(event) {
    event.preventDefault()
    players.forEach((player) => { 
        player.onKeyRelease(event.keyCode)
    })
}


window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)