class DisplayGrid {
    constructor(gridObj, gridOwner) {
        this.width = gridObj.board[0].length
        this.height = gridObj.board.length
        this.gridOwner = gridOwner
        this.$board = $('.container')
    }
    generateGrid() {
        for (let i = 0; i < this.width; i++) {
            //this.board.push([])
            const $columnVisual = $('<div>').addClass(i)
            this.$board.append($columnVisual)

            for (let j = 0; j < this.height; j++) {
                // const cell = new Cell()
                // this.board[i].push(cell)
                const $gridVisual = $('<div>').addClass("grid")
                $columnVisual.append($gridVisual)
            }
        }
    }
}

class DisplayShip {
    constructor(shipObj) {
        this.type = shipObj.type
        this.name = shipObj.name
        //coordinates of the battleship. The four attributes are required to allow rotating the ship
        this.front = shipObj.front
        this.back = shipObj.back
        this.right = shipObj.right
        this.left = shipObj.left

        this.dead = false
    }
    generateShip() {
        const $ship = $('<div>').addClass("ship")
        $ship.css('height', (this.front + this.back) * 32 + "px").css('width', (this.right + this.left) * 32 + "px")
        $ship.draggable({
            opacity: 0.7, snap: ".grid", snapMode: "outer",
            cursorAt: { top: (this.front + this.back) * 16, left: (this.left + this.right) * 16 }
        })
        $('.ships').append($ship)

        // $ship.click(function(mouse) {
        //     const drag = setInterval(() => {
        //         $ship.
        //     }, 500)
        // })

        $ship.click(function (mouse) {
            console.log(mouse.pageX, mouse.pageY);
        })
    }
    regenerateShip() {

    }
    rotateShip() {
        if (this.right === 0.5) {
            this.left = this.front
            this.right = this.back
            this.front = 0.5
            this.back = 0.5
        }
        else {
            this.back = this.right
            this.front = this.left
            this.right = 0.5
            this.left = 0.5
        }
        const $ship = $('.ship')
        $ship.css('height', (this.front + this.back) * 32 + "px").css('width', (this.right + this.left) * 32 + "px")
        $ship.draggable({
            opacity: 0.7, snap: ".grid", snapMode: "outer",
            cursorAt: { top: (this.front + this.back) * 16, left: (this.right + this.left) * 16 }
        })
    }
}



function hoverOver() {
    $(this).addClass("unplaceable")
}

function hoverOut() {
    $(this).removeClass("unplaceable")
}