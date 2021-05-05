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
        this.currentDistanceTraveled = 0
        this.color = color
        this.keyMap = Player.keyMap
        Player.keyMap += 1

        // keeping track of the previous player movement
        this.previous_movement_rects = []
        this.previous_movement_rects_curr_idx = 0
        this.currentRect = {
            startX: this.x,
            startY: this.y
        }
        this.next_rect = {
            left: -10,
            right: -10,
            top: -10,
            bottom: -10,
        }
        this.hasChangedDirection = false
        this.player_rect = {}
    }

    update(progress) {
        let movement = progress * this.currentSpeed
        switch (this.currentKey) {
            case 'up':
                this.y -= movement
                break
            case 'down':
                this.y += movement
                break
            case 'left':
                this.x -= movement
                break
            case 'right':
                this.x += movement
                break
        }
        this.currentDistanceTraveled += Math.abs(movement)

        this.buildWayRectangles()

        this.player_rect = {
            top: this.y - this.currentSize / 2,
            bottom: this.y + this.currentSize / 2,
            left: this.x - this.currentSize / 2,
            right: this.x + this.currentSize / 2
        }

        let intersection = false
        for (let i = 0; i < this.previous_movement_rects.length; ++i) {
            if (intersectRect(this.player_rect, this.previous_movement_rects[i])) {
                intersection = true
                break
            }
        }
        if (intersection) {
            alert("GAME OVER: Player '" + this.name + "' has lost!")
            gameOver = true
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.currentSize / 2, this.y - this.currentSize / 2, this.currentSize, this.currentSize)
    }

    onKeyPress(keyCode) {
        let key = keyMaps[this.keyMap][keyCode]
        if (!key) return
        if (isKeyAllowed(this.currentKey, key)) {
            this.currentKey = key
            this.onDirectionChange()
        }
    }

    /* Build the rectangles behind the player */
    buildWayRectangles() {
        // each 30 units update the rectangle trail
        if (this.currentDistanceTraveled < 30) return
        this.currentDistanceTraveled = 0
        // each time the player changes its direction, increment 'previous_movement_rects_curr_idx'
        // in order to write to the next idx in the 'previous_movement_rects' array
        // if the player did not change the direction since last call, we simply write to the last idx
        if (this.hasChangedDirection) {
            this.hasChangedDirection = false
            this.previous_movement_rects_curr_idx++
        }

        // add the rect previously created from last function call (with a delay of 'currentDistanceTraveled')
        // this prevents the player intersecting with its own rectangle trail behind him because it is created too fast
        this.previous_movement_rects[this.previous_movement_rects_curr_idx] = this.next_rect

        // create the rect of the current players location for the next method iteration
        let rect = {
            left: Math.min(this.currentRect.startX, this.x) - this.currentSize / 2,
            right: Math.max(this.currentRect.startX, this.x) + this.currentSize / 2,
            top: Math.min(this.currentRect.startY, this.y) - this.currentSize / 2,
            bottom: Math.max(this.currentRect.startY, this.y) + this.currentSize / 2
        }
        // persist it
        this.next_rect = rect
    }

    onDirectionChange() {
        // set starting points for the next trail rect
        this.currentRect = {
            startX: this.x,
            startY: this.y
        }
        // notify 'buildWayRectangles' that the player has changed its direction
        this.hasChangedDirection = true
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
