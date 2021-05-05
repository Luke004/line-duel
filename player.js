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

        // keeping track of the player's trail rectangles
        this.trail_rects = []
        this.trail_rects_curr_idx = 0
        this.current_trail_rect = {
            startX: this.x,
            startY: this.y
        }
        this.next_trail_rect = {
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
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color
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
        // each time the player changes its direction, increment 'trail_rects_curr_idx'
        // in order to write to the next idx in the 'trail_rects' array
        // if the player did not change the direction since last call, we simply write to the last idx
        if (this.hasChangedDirection) {
            this.hasChangedDirection = false
            this.trail_rects_curr_idx++
        }

        // add the rect previously created from last function call (with a delay of 'currentDistanceTraveled')
        // this prevents the player intersecting with its own rectangle trail behind him because it is created too fast
        this.trail_rects[this.trail_rects_curr_idx] = this.next_trail_rect

        // create the rect of the current players location for the next method iteration
        let rect = {
            left: Math.min(this.current_trail_rect.startX, this.x) - this.currentSize / 2,
            right: Math.max(this.current_trail_rect.startX, this.x) + this.currentSize / 2,
            top: Math.min(this.current_trail_rect.startY, this.y) - this.currentSize / 2,
            bottom: Math.max(this.current_trail_rect.startY, this.y) + this.currentSize / 2
        }
        // persist it
        this.next_trail_rect = rect
    }

    onDirectionChange() {
        // set starting points for the next trail rect
        this.current_trail_rect = {
            startX: this.x,
            startY: this.y
        }
        // notify 'buildWayRectangles' that the player has changed its direction
        this.hasChangedDirection = true
    }

    getTrailRects() {
        return this.trail_rects
    }

    getPlayerRect() {
        return this.player_rect
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
