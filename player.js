class Player {

    static defaultSpeed = 0.1
    static defaultSize = 10
    static keyMap = 0

    constructor(name, color, startX, startY) {
        this.name = name
        this.x = startX
        this.y = startY
        this.currentKey = 'up'
        this.currentSpeed = Player.defaultSpeed
        this.currentSize = Player.defaultSize
        this.color = color
        this.keyMap = Player.keyMap
        Player.keyMap += 1
    }

    update(progress) {
        switch (this.currentKey) {
            case 'up':
                this.y -= progress * this.currentSpeed
                break
            case 'down':
                this.y += progress * this.currentSpeed
                break
            case 'left':
                this.x -= progress * this.currentSpeed
                break
            case 'right':
                this.x += progress * this.currentSpeed
                break
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.currentSize / 2, this.y - this.currentSize / 2, this.currentSize, this.currentSize)
    }

    onKeyPress(keyCode) {
        console.log(keyMaps[this.keyMap][keyCode])
        let key = keyMaps[this.keyMap][keyCode]
        if (!key) return
        if (isKeyAllowed(this.currentKey, key)) {
            this.currentKey = key
        }
    }

}


const keyMaps = [
    {
        // Player1 (WASD)
        68: 'right',
        65: 'left',
        87: 'up',
        83: 'down',
    },
    {
        // Player 2 (Arrows)
        39: 'right',
        37: 'left',
        38: 'up',
        40: 'down',
    }
]