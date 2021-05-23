class Player {

    static defaultSpeed = 0.1
    static defaultSize = 5
    static keyMap = 0

    constructor(name, color, startX, startY) {
        // visuals
        this.name = name
        this.color = color
        this.el = createPlayerElement(name, color)

        // specs
        this.currentSpeed = Player.defaultSpeed
        this.currentSize = Player.defaultSize
        this.rotateSpeed = 0.2

        // movement
        this.x = startX
        this.y = startY
        this.rotation = 0
        this.xDir = 0
        this.yDir = 0

        // keys
        this.keyMap = Player.keyMap
        Player.keyMap += 1
        this.leftKeyPressed = false
        this.rightKeyPressed = false
        this.noDrawKeyPressed = false
    }

    update(progress) {
        if (this.leftKeyPressed) {
            this.rotation -= this.rotateSpeed * progress
        }
        if (this.rightKeyPressed) {
            this.rotation += this.rotateSpeed * progress
        }
        // normalize rotation
        this.rotation = this.rotation % 360
        if (this.rotation < 0) {
            this.rotation += 360
        }
        // update direction
        this.xDir = Math.sin(this.rotation * Math.PI / 180)
        this.yDir = -Math.cos(this.rotation * Math.PI / 180)
        this.xDir *= progress * this.currentSpeed
        this.yDir *= progress * this.currentSpeed
        // update position
        this.x += this.xDir
        this.y += this.yDir
        this.el.style.left = this.x - this.currentSize  + "px";
        this.el.style.top = this.y - this.currentSize  + "px";

    }

    draw(ctx) {
        if(this.noDrawKeyPressed) return
        // draw the player circle
        ctx.beginPath()
        ctx.arc(this.x - this.currentSize / 2, this.y - this.currentSize / 2, this.currentSize, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.strokeStyle = this.color
        ctx.stroke()
    }

    onKeyDown(keyCode) {
        let key = keyMaps[this.keyMap][keyCode]

        switch (key) {
            case 'left':
                this.leftKeyPressed = true
                break
            case 'right':
                this.rightKeyPressed = true
                break
            case 'noDraw':
                this.noDrawKeyPressed = true
                break
        }
    }

    onKeyRelease(keyCode) {
        let key = keyMaps[this.keyMap][keyCode]
        switch (key) {
            case 'left':
                this.leftKeyPressed = false
                break
            case 'right':
                this.rightKeyPressed = false
                break
            case 'noDraw':
                this.noDrawKeyPressed = false
                break
        }
    }

    /*
    getPlayerCircle() {
        return this.player_circle
    }
    */

}


const keyMaps = [
    {
        // Player1 (WASD)
        68: 'right',
        65: 'left',
        87: 'up',
        83: 'down',
        17: 'noDraw',
    },
    {
        // Player 2 (Arrows)
        39: 'right',
        37: 'left',
        38: 'up',
        40: 'down',
        32: 'noDraw',
    }
]
