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
        $ship.css('height', (this.front + this.back)*32 + "px").draggable({opacity: 0.7, snap: ".grid", snapMode: "outer" })
        $('.ships').append($ship)
        
        // $ship.click(function(mouse) {
        //     const drag = setInterval(() => {
        //         $ship.
        //     }, 500)
        // })

       $ship.click(function(mouse) {
            console.log(mouse.pageX, mouse.pageY);
        })
    }
    regenerateShip() {

    }
    rotateShip() {

    }
}



function hoverOver() {
    $(this).addClass("unplaceable")
}

function hoverOut() {
    $(this).removeClass("unplaceable")
}