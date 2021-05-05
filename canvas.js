class Canvas {

    constructor(width, height) {
        this.height = height
        this.width = width
        this.canvas = document.getElementById("gameCanvas")
        this.ctx = this.canvas.getContext("2d")
    }

}