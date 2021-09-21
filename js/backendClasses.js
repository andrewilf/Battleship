const shipNames = {
    //pool of names which can be called for each ship
    availableNames: [
        'Czarevitch',
        'Salsa',
        'Gal-Pal',
        'Pequest',
        'Isidore-Cameleyre',
        'Almkerk',
        'Arnaldo',
        'Shiromine Maru',
        'BRAVADO',
        'Aruba',
        'Jib&Tonic',
        'Amiral Sallandrouze de Lamornaix',
        'Agios Georgios',
        'Brighton',
        'kartika',
        'Murmanets',
        'Pinebay',
        'Whonos',
        'Rover-1',
        'Our Solitude',
        'Speedlink Vanguard',
        'Delpa II',
        'Sea Skank',
        'Ms Miriam',
        'Dewy\'s bouey',
        'Warmond',
        'Almoural',
        'Klarelfvan',
        'Challeage',
        'Arreton',
        'Bornrif',
        'Family Foto',
        'Invor',
        'Anna Sophia',
        'Newhall Hills',
        'Adler',
        'Con-Tract-Oar',
        'Bombard',
        'Martin Van Buren',
        'Pellegrini',
        'Alder Park',
        'Kwong Tung',
        'Pyewacket',
        'Itamar',
        'Flow',
        'ENCHANTRESS',
        'Westmore',
        'Myrmidon',
        'Emily Rose',
        'Leouardo Rodriguez',
    ],
    //ship names which are taken are added to this array
    takenNames: [],
    //method which choses a ship name, if not taken, add to taken names array and return the value. Otherwise try again
    asignName: function () {
        let done = false
        while (!done) {
            let choice = Math.ceil(Math.random() * this.availableNames.length - 1)
            //console.log(choice)
            let currentName = this.availableNames[choice]
            if (this.takenNames.find(name => name === currentName)) {
                ``
                //console.log("name taken: ", currentName)
            }
            else {
                //console.log("found name")
                this.takenNames.push(currentName)
                done = true
                //console.log("name available: ", currentName)
                return currentName
            }
        }
    }
}
//common stats for each ship type
const shipStats = {
    carrier: {
        length: 5,
        attack: 1,
        canons: 1
    },
    battleship: {
        length: 4,
        attack: 1,
        canons: 1
    },
    cruiser: {
        length: 3,
        attack: 1,
        canons: 1
    },
    submarine: {
        length: 3,
        attack: 1,
        canons: 1
    },
    destroyer: {
        length: 2,
        attack: 1,
        canons: 1
    },
}

let currentHover = ""

const splitCoordinates = (coordinate) => {  //gets fed coordinates and translate then into numbers of the grid array, always offset by 1
    console.log(coordinate)
    try {
        const column = coordinate[0].charCodeAt(0) - 65
        const row = parseInt(coordinate.substr(1)) - 1
        if (column < 0 || column > 27) {
            throw 'must be between A and Z'
        }
        return [column, row]
    }
    catch {
        return undefined
    }


}

// A cell object used to make a game board. Each cell has boolean states such as shotAt, occupied
class Cell {
    constructor() {
        this.shotAt = false
        this.occupiedName = ''
    }
    shotAt() {
        this.shotAt = true
    }
    occupy(name) {
        this.occupiedName = name
    }
}

// a board object consists of cell objects. Each board object belongs to one player
class Board {
    constructor(width, height, owner) {
        this.height = height
        this.width = width
        this.owner = owner
        this.board = []
        this.$board = $('<div>').attr("id", owner).addClass("container")
        $('#main').append(this.$board)
        for (let i = 0; i < height; i++) {
            this.board.push([])
            for (let j = 0; j < width; j++) {
                const cell = new Cell()
                this.board[i].push(cell)
            }
        }
        //console.log(this.board)
    }
    generateVisual() {
        for (let i = 0; i < this.width; i++) {
            const $columnVisual = $('<div>')//.attr("id", String.fromCharCode(65 + i))
            this.$board.append($columnVisual) //each width div encapsulates a full column
            for (let j = 1; j <= this.height; j++) {

                const $gridVisual = $('<div>').addClass("grid").attr("coordinate", String.fromCharCode(65 + i) + j)
                $columnVisual.append($gridVisual)               //attribute "coordinates" tells us where on the grid it is e.g. E4 is 5th column and 4th row
            }
        }
    }
    updateCell(cellToCheckCoordinates, newStatus) {
        //console.log(splitCoordinates(cellToCheckCoordinates))
        const [column, row] = cellToCheckCoordinates//splitCoordinates(cellToCheckCoordinates)
        //const cellToCheck = this.board[column][row]
        const $cell = this.$board.children().eq(column).children().eq(row)
        //$cell.removeClass()
        $cell.addClass("grid")
        $cell.addClass(newStatus)
    }
    hoverOffCell(cellToCheckCoordinates, newStatus) {
        //console.log(splitCoordinates(cellToCheckCoordinates))
        const [column, row] = cellToCheckCoordinates//splitCoordinates(cellToCheckCoordinates)
        //const cellToCheck = this.board[column][row]
        const $cell = this.$board.children().eq(column).children().eq(row)
        $cell.removeClass(newStatus)
        // $cell.addClass("grid")
        // $cell.addClass(newStatus)
    }
    checkPlaceShip(shipObj, currentHover) {
        console.log(currentHover)
        const [column, row] = splitCoordinates(currentHover)
        const coordinatesToCheck = []
        let blockedFlag = false
        if (this.board[row][column].occupiedName === '') {
            coordinatesToCheck.push([column, row])
        }
        else {
            blockedFlag = true
        } try {
            for (let front = 1; front <= shipObj.front && shipObj.front !== 0; front++) {
                console.log(this.board[row][column - front].occupiedName)

                if (column - front >= 0 && this.board[row][column - front].occupiedName === '') {
                    //if () {
                    coordinatesToCheck.push([column - front, row])
                    // }
                }
                else {
                    blockedFlag = true

                }
            }


            for (let back = 1; back <= shipObj.back && shipObj.back !== 0; back++) {
                if (column + back < this.width && this.board[row][column + back].occupiedName === '') {
                    coordinatesToCheck.push([column + back, row])
                }
                else {
                    blockedFlag = true
                }
            }
            for (let left = 1; left <= shipObj.left && shipObj.left !== 0; left++) {
                if (row - left >= 0 && this.board[row - left][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row - left])
                } else {
                    blockedFlag = true
                }
            }
            for (let right = 1; right <= shipObj.right && shipObj.right !== 0; right++) {
                if (row + right < this.height && this.board[row + right][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row + right])
                } else {
                    blockedFlag = true
                }
            }
        }
        catch (e) {
            blockedFlag = true
        }
        if (!blockedFlag) {
            for (const cell of coordinatesToCheck) {
                console.log(cell)
                this.updateCell(cell, "placeable")
            }
        }
        else {
            for (const cell of coordinatesToCheck) {
                console.log(cell)
                this.updateCell(cell, "unplaceable")
            }
        }

    }
    refreshPlaceShip(shipObj, currentHover) {
        console.log(currentHover)
        const [column, row] = splitCoordinates(currentHover)
        const coordinatesToCheck = []
        let blockedFlag = false
        if (this.board[row][column].occupiedName === '') {
            coordinatesToCheck.push([column, row])
        }
        else {
            blockedFlag = true
        }
        try {
            for (let front = 1; front <= shipObj.front && shipObj.front !== 0; front++) {
                console.log(this.board[row][column - front].occupiedName)

                if (column - front >= 0 && this.board[row][column - front].occupiedName === '') {
                    //if () {
                    coordinatesToCheck.push([column - front, row])
                    // }
                }
                else {
                    blockedFlag = true

                }
            }


            for (let back = 1; back <= shipObj.back && shipObj.back !== 0; back++) {
                if (column + back < this.width && this.board[row][column + back].occupiedName === '') {
                    coordinatesToCheck.push([column + back, row])
                }
                else {
                    blockedFlag = true
                }
            }
            for (let left = 1; left <= shipObj.left && shipObj.left !== 0; left++) {
                if (row - left >= 0 && this.board[row - left][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row - left])
                } else {
                    blockedFlag = true
                }
            }
            for (let right = 1; right <= shipObj.right && shipObj.right !== 0; right++) {
                if (row + right < this.height && this.board[row + right][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row + right])
                } else {
                    blockedFlag = true
                }
            }
        }
        catch (e) {
            blockedFlag = true
        }
        if (!blockedFlag) {
            for (const cell of coordinatesToCheck) {
                console.log(cell)
                this.hoverOffCell(cell, "placeable")
            }
        }
        else {
            for (const cell of coordinatesToCheck) {
                console.log(cell)
                this.hoverOffCell(cell, "unplaceable")
            }
        }
    }
    placeShip(shipObj, middleCoor) {
        console.log(middleCoor)
        const [column, row] = splitCoordinates(middleCoor)
        const coordinatesToCheck = []
        let blockedFlag = false
        if (this.board[row][column].occupiedName === '') {
            coordinatesToCheck.push([column, row])
        }
        else {
            blockedFlag = true
        } try {
            for (let front = 1; front <= shipObj.front && shipObj.front !== 0; front++) {
                console.log(this.board[row][column - front].occupiedName)

                if (column - front >= 0 && this.board[row][column - front].occupiedName === '') {
                    //if () {
                    coordinatesToCheck.push([column - front, row])
                    // }
                }
                else {
                    blockedFlag = true

                }
            }


            for (let back = 1; back <= shipObj.back && shipObj.back !== 0; back++) {
                if (column + back < this.width && this.board[row][column + back].occupiedName === '') {
                    coordinatesToCheck.push([column + back, row])
                }
                else {
                    blockedFlag = true
                }
            }
            for (let left = 1; left <= shipObj.left && shipObj.left !== 0; left++) {
                if (row - left >= 0 && this.board[row - left][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row - left])
                } else {
                    blockedFlag = true
                }
            }
            for (let right = 1; right <= shipObj.right && shipObj.right !== 0; right++) {
                if (row + right < this.height && this.board[row + right][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row + right])
                } else {
                    blockedFlag = true
                }
            }
        }
        catch (e) {
            blockedFlag = true
        }
        if (!blockedFlag) {
            for (const cell of coordinatesToCheck) {
                console.log(cell)
                this.updateCell(cell, "placeable")
            }
        }
        else {
            for (const cell of coordinatesToCheck) {
                console.log(cell)
                this.updateCell(cell, "unplaceable")
            }
        }

    }
    placeShipManually(shipObj, middleCoor) {
        const [column, row] = splitCoordinates(middleCoor)
        const placedCoordinates = []
        console.log("row: ", row, "column: ", column)
        if (!this.board[row][column].occupiedName) {
            this.board[row][column].occupiedName = shipObj.name
            placedCoordinates.push([row, column])
            console.log(this.board[row][column].occupiedName)

            for (let front = 1; front <= shipObj.front; front++) {
                if (!this.board[row][column - front].occupiedName) {
                    this.board[row][column - front].occupiedName = shipObj.name
                    placedCoordinates.push([row, column - front])
                }
                else {
                    console.log("occupied")
                    break
                }
                //console.log(this.board[row][column - front].occupiedName)
            }
            for (let back = 1; back <= shipObj.back; back++) {
                if (!this.board[row][column + back].occupiedName) {
                    this.board[row][column + back].occupiedName = shipObj.name
                    placedCoordinates.push([row, column + back])
                }
                else {
                    console.log("occupied")
                    break
                }
                //console.log(this.board[row][column + back].occupiedName)
            }
            for (let left = 1; left <= shipObj.left; left++) {
                if (!this.board[row - left][column].occupiedName) {
                    this.board[row - left][column].occupiedName = shipObj.name
                    placedCoordinates.push([row - left, column])
                }
                else {
                    console.log("occupied")
                    break
                }
                //console.log(this.board[row - left][column].occupiedName)
            }
            for (let right = 1; right <= shipObj.right; right++) {
                if (!this.board[row + right][column].occupiedName) {
                    this.board[row + right][column].occupiedName = shipObj.name
                    placedCoordinates.push([row + right, column])
                }
                else {
                    console.log("occupied")
                    break
                }
                console.log(this.board[row + right][column].occupiedName)
            }
            if (placedCoordinates.length != (shipObj.front + shipObj.back + shipObj.right + shipObj.left + 1)) {
                console.log(placedCoordinates)
                console.log("ship cannot be placed")
                for (const coordinates of placedCoordinates) {
                    this.board[coordinates[0]][coordinates[1]].occupiedName = ""
                }
                return false
            }
            console.log("success")
            for (const cell of placedCoordinates) {
                console.log(cell)
                this.updateCell([cell[1], cell[0]], "ship")
            }
            return true
        }
        else {
            console.log("origin is occupied")
            return false
        }
    }
}

// generic Ship object. may have children classes if more specific battleships are required
class Ship {
    constructor(type, name, length, attack = 1, canons = 1) {
        this.type = type
        this.name = name
        //coordinates of the battleship. The four attributes are required to allow rotating the ship
        this.front = Math.ceil((length - 1) / 2)
        this.back = Math.floor((length - 1) / 2)
        this.right = 0
        this.left = 0
        //attack, canons, and health attribute is provided to allow other game modes once the basic game is constructed
        this.attack = attack
        this.health = length
        this.canons = canons
        this.coordinates = []
        this.dead = false

    }
    //returns true if ship is alive. If ship has 0 health, it returns false and the ship object this.dead is made true
    checkAlive() {
        if (this.health < 1) {
            this.dead = true
            return false
        }
        return true
    }
    //method rotates the ship clockwise
    rotateClockwise() {
        if (this.right === 0) {
            this.left = this.back
            this.right = this.front
            this.front = 0
            this.back = 0
            console.log("rotate from vertical")
        }
        else {
            this.back = this.right
            this.front = this.left
            this.right = 0
            this.left = 0
            console.log("rotate from horizontal")
        }
    }
    //method rotates the ship anti-clockwise
    rotateAntiClockwise() {
        if (this.right === 0) {
            this.left = this.front
            this.right = this.back
            this.front = 0
            this.back = 0
        }
        else {
            this.back = this.left
            this.front = this.right
            this.right = 0
            this.left = 0
        }
    }
}

//player class
class Player {
    constructor(prefix, carriers = 1, battleships = 1, cruisers = 1, submarines = 1, destroyers = 1) {
        this.prefix = prefix
        this.fleet = []
        this.fleetCount = {
            carrier: carriers,
            battleship: battleships,
            cruiser: cruisers,
            submarine: submarines,
            destroyer: destroyers
        }
    }
    //checks the players fleet count and creates their fleet
    createFleet() {
        //loops for each ship type
        for (const shipType in shipStats) {
            for (let i = 0; i < this.fleetCount[shipType]; i++) {
                //generates a ship name by combining the player prefix and the assigned name
                const shipName = this.prefix + " " + shipNames.asignName()
                //create ship and add to fleet                
                const ship = new Ship(shipType, shipName,
                    shipStats[shipType].length, shipStats[shipType].attack, shipStats[shipType].canons)
                this.fleet.push(ship)
            }
        }
    }
    //adds a ship to fleet. More for debugging
    addShip(type, name) {
        const shipName = this.prefix + " " + name
        //create ship and add to fleet                
        const ship = new Ship(type, shipName,
            shipStats[type].length, shipStats[type].attack, shipStats[type].canons)
        this.fleet.push(ship)
    }
    //calls the names of every ship currently in the players fleet
    rollCall() {
        console.log("roll call!")
        for (const ship of this.fleet) {
            console.log(`${ship.name} class ${ship.type}`)
        }
        console.log("")
    }
    //removes ship from fleet
    shipDestroyed(destroyedShipName) {
        const index = this.fleet.findIndex((ship) => ship.name === destroyedShipName)
        if (index !== -1) {
            console.log("removing", this.fleet[index])
            this.fleet.splice(index, 1, '')
        }
        else {
            console.error("cannot remove a ship which does not exist")
        }
    }
}