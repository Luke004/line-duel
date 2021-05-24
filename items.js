const ITEM_SIZE = 15

var items = []

function spawnItem(ctx, x, y, type) {
    let itemColor
    switch (type) {
        case "speed":
            itemColor = "rgb(252, 186, 3)"      // yellow
            break
        case "slow":
            itemColor = "rgb(252, 107, 3)"      // orange
            break
        case "big":
            itemColor = "rgb(128, 3, 252)"      // violet
            break
        case "small":
            itemColor = "rgb(3, 194, 252)"      // lightblue
            break
    }
    // draw the item
    drawCircle(ctx, x, y, ITEM_SIZE, itemColor, "black")
    // add to items list
    items.push({ x: x, y: y })
}

/* Checks a pixel in the canvas if it is colliding with an item */
function checkItemCollisions(ctx, player, data) {
    let itemFound = false
    // rgb(252, 186, 3) = "speed"
    if (data[0] == 252 && data[1] == 186 && data[2] == 3) {
        player.currentSpeed += 0.025
        player.rotateSpeed += 0.025
        itemFound = true
    }
    // rgb(252, 107, 3) = "slow"
    else if (data[0] == 252 && data[1] == 107 && data[2] == 3) {
        player.currentSpeed -= 0.025
        player.rotateSpeed -= 0.025
        itemFound = true
    }
    // rgb(128, 3, 252) = "big"
    else if (data[0] == 128 && data[1] == 3 && data[2] == 252) {
        player.currentSize += 1
        itemFound = true
    }
    // rgb(3, 194, 252) = "small"
    else if (data[0] == 3 && data[1] == 194 && data[2] == 252) {
        player.currentSize -= 1
        itemFound = true
    }

    if (itemFound) {
        // look for the item and remove it
        for (let i = 0; i < items.length; ++i) {
            if (distance(items[i].x, items[i].y, player.x, player.y) < ITEM_SIZE) {
                // draw a white circle above the item which makes it dissapear
                drawCircle(ctx, items[i].x, items[i].y, ITEM_SIZE + 1, "white", "white")
                // remove the item from list
                items.splice(i, 1)
                return
            }
        }
    }
}

function spawnRandomItems(ctx) {
    let maxX = canvas.width - ITEM_SIZE,
        maxY = canvas.height - ITEM_SIZE,
        minX = 0 + ITEM_SIZE,
        minY = minX

    setInterval(function () {
        let newX = randomIntFromInterval(minX, maxX)
        let newY = randomIntFromInterval(minY, maxY)
        if (spaceIsFree(ctx, newX, newY, ITEM_SIZE)) {
            let newItem
            let randomItemIndex = randomIntFromInterval(1, 4)
            switch (randomItemIndex) {
                case 1:
                    newItem = "speed"
                    break
                case 2:
                    newItem = "slow"
                    break
                case 3:
                    newItem = "big"
                    break
                case 4:
                    newItem = "small"
                    break
            }
            spawnItem(ctx, newX, newY, newItem)
        }
    }, 3000)
}
