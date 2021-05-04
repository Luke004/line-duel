class Player {

    static defaultSpeed = 0.1
    static defaultSize = 10

    constructor(name, color, startX, startY) {
        this.name = name
        this.x = startX
        this.y = startY
        this.currentKey = 'up'
        this.currentSpeed = Player.defaultSpeed
        this.currentSize = Player.defaultSize
        this.color = color
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

    onKeyPress(key) {
        if (isKeyAllowed(this.currentKey, key)) {
            this.currentKey = key
        }
    }

}
