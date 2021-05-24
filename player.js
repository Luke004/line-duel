class Player {

    static defaultSpeed = 0.1
    static defaultSize = 5
    static keyMap = 0

    constructor(name, color, startX, startY) {
        // visuals
        this.name = name
        this.color = color

        // specs
        this.currentSpeed = Player.defaultSpeed
        this.currentSize = Player.defaultSize
        this.rotateSpeed = 0.2

        // movement
        this.x = startX
        this.y = startY
        this.rotation = 90
        this.xDir = 0
        this.yDir = 0
        this.positions = []

        // keys
        this.keyMap = Player.keyMap
        Player.keyMap += 1
        this.leftKeyPressed = false
        this.rightKeyPressed = false
        this.noDrawKeyPressed = false

        // create the player html element
        this.el = createPlayerElement(name, color, this.currentSize * 2)
    }

    update(progress, ctx) {
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
        // set the player element position
        // 0.92 is the scaling you need to do to convert from canvas to html-element
        this.el.style.left = this.x - this.currentSize * 0.92 + "px"
        this.el.style.top = this.y - this.currentSize * 0.92 + "px"
        // save prev positions to draw the trail
        if (!this.noDrawKeyPressed) {
            this.positions.push({
                x: this.x,
                y: this.y
            })
        }
        // data is the current pixel that is in the middle of the players arc
        // this is now used to check for collisions with trails and items
        let data = ctx.getImageData(this.x, this.y, 1, 1).data

        checkTrailCollisions(ctx, this.x, this.y, data)

        // item collision detection
        checkItemCollisions(ctx, this, data)
    }

    draw(ctx) {
        if (this.positions.length > this.currentSize * 2) {
            if (!this.noDrawKeyPressed) {
                // draw the player's trail
                let next = this.positions[0]
                this.positions.splice(0, 1)
                drawCircle(ctx, next.x, next.y, this.currentSize, this.color, this.color)
            }
        }
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
                this.positions = []
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
    },
    {
        // Player 3 (Numpad)
        102: 'right',
        100: 'left',
        104: 'up',
        98: 'down',
        96: 'noDraw',
    }
]
