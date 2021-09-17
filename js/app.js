const App = {

}

const Display = {

}

class Cell {
    // A cell object used to make a game board. Each cell has boolean states such as shotAt, occupied
    constructor() {
        this.shotAt = false
        this.occupied = false
    }
}

class Board {
    // a board object consists of cell objects. Each board object belongs to one player
    constructor(width, height) {
        this.board = []
        for (let i = 0; i < height; i++) {
            this.board.push([])
            for (let j = 0; j < width; j++) {
                const cell = new Cell()
                this.board[i].push(cell)
            }
        }
        console.log(this.board)
    }
}

class Battleship {
    // generic Battleship object. may have children classes if more specific battleships are required
    constructor(type, length, attack, health) {
        this.type = type
        //coordinates of the battleship. The four attributes are required to allow rotating the ship
        this.front = Math.ceil(length / 2)
        this.back = Math.floor(length / 2)
        this.right = 0
        this.left = 0
        //attack, canons, and health attribute is provided to allow other game modes once the basic game is constructed
        this.attack = 1
        this.health = length
        this.canons = 1

        this.dead = false

    }
    checkAlive() {
        if (this.health < 1) {
            //returns true if ship is alive. If ship has 0 health, it returns false and the ship object this.dead is made true
            this.dead = true
            return false
        }
        return true
    }
}

const board = new Board(3, 2)
console.log(board)

const cruiser = new Battleship("cruiser", 5)
console.log(cruiser)

// $(() => {

// })