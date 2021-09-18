class DisplayGrid {
    constructor(gridObj, gridOwner) {
        this.width = gridObj.board[0].length
        this.height = gridObj.board.length
        this.gridOwner = gridOwner
        this.name = gridObj.name
        this.$board = $('.container')
    }
    generateGrid() {
        for (let i = 0; i < this.width; i++) {
            //this.board.push([])
            const $columnVisual = $('<div>')//.attr("id", String.fromCharCode(65 + i))
            this.$board.append($columnVisual)

            for (let j = 0; j < this.height; j++) {
                // const cell = new Cell()
                // this.board[i].push(cell)
                const $gridVisual = $('<div>').addClass("grid")//.attr("id",String.fromCharCode(65 + i)  + j)
                $columnVisual.append($gridVisual)
            }
        }
    }
}

class DisplayShip {
    constructor(shipObj) {
        // this.type = shipObj.type
        // this.name = shipObj.name
        //coordinates of the battleship. The four attributes are required to allow rotating the ship
        // this.front = shipObj.front
        // this.back = shipObj.back
        // this.right = shipObj.right
        // this.left = shipObj.left
        this.shipObj = shipObj
        console.log(this.shipObj)
        // this.dead = false
    }
    generateShip() {
        const $ship = $('<div>').addClass("ship").attr('id', this.shipObj.name)
        const midY = this.shipObj.front + this.shipObj.back
        const midX = this.shipObj.left + this.shipObj.right + 1

        $ship.css('height', (midY + 1) * 32 + "px")
            .css('width', midX * 32 + "px")

        $ship.draggable({
            opacity: 0.7, snap: ".grid", snapMode: "outer",
            cursorAt: { top: midY * 16, left: midX * 16 }
        })
        $('.ships').append($ship)

        // $ship.click(function(mouse) {
        //     const drag = setInterval(() => {
        //         $ship.
        //     }, 500)
        // })

        // $ship.click(function (mouse) {
        //     console.log(mouse.pageX, mouse.pageY);
        // })
        // $ship.dblclick(() => {
        //     console.log("asd")

        //     this.regenerateShip(this)
        // })
    }
    regenerateShip() {
        const $ship = $("#" + this.shipObj.name)
        if (this.shipObj.right === 0) {
            const midY = this.shipObj.front + this.shipObj.back
            const midX = this.shipObj.left + this.shipObj.right + 1
        }
        else {
            const midY = this.shipObj.front + this.shipObj.back + 1
            const midX = this.shipObj.left + this.shipObj.right
        }
        $ship.css('height', midY * 32 + "px")
            .css('width', midX * 32 + "px")
        $ship.draggable({
            opacity: 0.7, snap: ".grid", snapMode: "outer",
            cursorAt: { top: midY * 16, left: midX * 16 }
        })
    }
}



function hoverOver() {
    $(this).addClass("unplaceable")
}

function hoverOut() {
    $(this).removeClass("unplaceable")
}