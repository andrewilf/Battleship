const shipNames = {
    //pool of names which can be called for each ship
    availableNames: [
        'Czarevitch',
        'Salsa',
        'Gal Pal',
        'Pequest',
        'Isidore Cameleyre',
        'Almkerk',
        'Arnaldo',
        'Shiromine Maru',
        'BRAVADO',
        'Aruba',
        'Jib n Tonic',
        'Amiral Sallandrouze de Lamornaix',
        'Agios Georgios',
        'Brighton',
        'kartika',
        'Murmanets',
        'Pinebay',
        'Whonos',
        'Rover 1',
        'Our Solitude',
        'Speedlink Vanguard',
        'Delpa II',
        'Sea Skank',
        'Ms Miriam',
        'Dewys bouey',
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
        'Con Tract Oar',
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
    //console.log(coordinate)
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
        this.currentShipIndex = 1
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

                const $gridVisual = $('<div>').addClass("grid").attr("coordinate", String.fromCharCode(65 + i) + j).addClass(this.owner)
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
        //$cell.addClass("grid")
        $cell.addClass(newStatus)
    }

    hoverOffCell(cellToCheckCoordinates, newStatus) {
        //console.log(splitCoordinates(cellToCheckCoordinates))
        const [column, row] = cellToCheckCoordinates//splitCoordinates(cellToCheckCoordinates)
        //const cellToCheck = this.board[column][row]
        const $cell = this.$board.children().eq(column).children().eq(row)
        $cell.removeClass(newStatus)
        // $cell.removeClass("unplaceable")
        // $cell.removeClass("placeable")
        // $cell.addClass("grid")
        // $cell.addClass(newStatus)
    }
    checkPlaceShip(shipObj, currentHover) {
        //console.log(currentHover)
        const [column, row] = splitCoordinates(currentHover)
        const coordinatesToCheck = []
        let blockedFlag = false
        if (this.board[row][column].occupiedName === '') {
            coordinatesToCheck.push([column, row])
        }
        else {
            blockedFlag = true
            coordinatesToCheck.push([column, row])
        } try {
            for (let front = 1; front <= shipObj.front && shipObj.front !== 0; front++) {
                //console.log(this.board[row][column - front].occupiedName)
                if (column - front >= 0 && this.board[row][column - front].occupiedName === '') {
                    coordinatesToCheck.push([column - front, row])
                    //console.log("front")
                }
                else {
                    blockedFlag = true
                    if (column - front >= 0) {
                    coordinatesToCheck.push([column - front, row])

                }}
            }
            for (let back = 1; back <= shipObj.back && shipObj.back !== 0; back++) {
                if (column + back <= this.width && this.board[row][column + back].occupiedName === '') {
                    coordinatesToCheck.push([column + back, row])
                    //console.log("back")
                }
                else {
                    blockedFlag = true
                    coordinatesToCheck.push([column + back, row])
                }
            }
            for (let left = 1; left <= shipObj.left && shipObj.left !== 0; left++) {
                if (row - left >= 0 && this.board[row - left][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row - left])
                    //console.log("left")
                } else {
                    blockedFlag = true
                    if (row - left >= 0) {
                    coordinatesToCheck.push([column, row - left])
                }}
            }
            for (let right = 1; right <= shipObj.right && shipObj.right !== 0; right++) {
                if (row + right <= this.height && this.board[row + right][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row + right])
                    //console.log("right")
                } else {
                    blockedFlag = true
                    coordinatesToCheck.push([column, row + right])

                }
            }
        }
        catch (e) {
            blockedFlag = true
        }
        if (!blockedFlag) {
            for (const cell of coordinatesToCheck) {
                //console.log(cell)
                this.updateCell(cell, "placeable")
            }
        }
        else {
            for (const cell of coordinatesToCheck) {
                //console.log(cell)
                this.updateCell(cell, "unplaceable")
            }
        }

    }
    refreshPlaceShip(shipObj, currentHover) {
        //console.log(currentHover)
        const [column, row] = splitCoordinates(currentHover)
        const coordinatesToCheck = []
        let blockedFlag = false
        if (this.board[row][column].occupiedName === '') {
            coordinatesToCheck.push([column, row])
        }
        else {
            blockedFlag = true
            coordinatesToCheck.push([column, row])
        } try {
            for (let front = 1; front <= shipObj.front && shipObj.front !== 0; front++) {
                //console.log(this.board[row][column - front].occupiedName)
                if (column - front >= 0 && this.board[row][column - front].occupiedName === '') {
                    coordinatesToCheck.push([column - front, row])
                }
                else {
                    blockedFlag = true
                    if (column - front >= 0) {
                        coordinatesToCheck.push([column - front, row])
                    }
                }
            }
            for (let back = 1; back <= shipObj.back && shipObj.back !== 0; back++) {
                if (column + back <= this.width && this.board[row][column + back].occupiedName === '') {
                    coordinatesToCheck.push([column + back, row])
                }
                else {
                    blockedFlag = true
                    coordinatesToCheck.push([column + back, row])
                }
            }
            for (let left = 1; left <= shipObj.left && shipObj.left !== 0; left++) {
                if (row - left >= 0 && this.board[row - left][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row - left])
                } else {
                    blockedFlag = true
                    if (row - left >= 0) {
                        coordinatesToCheck.push([column, row - left])
                    }
                }
            }
            for (let right = 1; right <= shipObj.right && shipObj.right !== 0; right++) {
                if (row + right <= this.height && this.board[row + right][column].occupiedName === '') {
                    coordinatesToCheck.push([column, row + right])
                } else {
                    blockedFlag = true
                    coordinatesToCheck.push([column, row + right])
                }
            }
        }
        catch (e) {
            blockedFlag = true
        }
        if (!blockedFlag) {
            for (const cell of coordinatesToCheck) {
                //console.log(cell)
                this.hoverOffCell(cell, "placeable")
            }
        }
        else {
            for (const cell of coordinatesToCheck) {
                //console.log(cell)
                this.hoverOffCell(cell, "unplaceable")
            }
        }
    }
    clearAllhoverCells() {
        for (let column = 0; column < this.width; column++) {
            for (let row = 0; row < this.height; row++) {
                const $cell = this.$board.children().eq(row).children().eq(column)
                $cell.removeClass("unplaceable")
                $cell.removeClass("placeable")
            }
        }
    }
    hideShipCells() {
        for (let column = 0; column < this.width; column++) {
            for (let row = 0; row < this.height; row++) {
                const $cell = this.$board.children().eq(row).children().eq(column)
                //$cell.removeClass("unplaceable")
                $cell.removeClass("ship")
            }
        }
    }
    placeShip(shipObj, middleCoordinates) {
        //console.log(middleCoordinates)
        const [column, row] = splitCoordinates(middleCoordinates)
        const coordinatesToCheck = []
        let blockedFlag = false
        try {
            if (this.board[row][column].occupiedName === '') {
                coordinatesToCheck.push([column, row])
            }
            else {
                blockedFlag = true
            }
            for (let front = 1; front <= shipObj.front && shipObj.front !== 0; front++) {
                //console.log(this.board[row][column - front].occupiedName)
                if (column - front >= 0 && this.board[row][column - front].occupiedName === '') {
                    coordinatesToCheck.push([column - front, row])
                }
                else {
                    blockedFlag = true

                }
            }
            for (let back = 1; back <= shipObj.back && shipObj.back !== 0; back++) {
                if (column + back <= this.width && this.board[row][column + back].occupiedName === '') {
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
                if (row + right <= this.height && this.board[row + right][column].occupiedName === '') {
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
                this.updateCell(cell, "ship")
                const [column, row] = cell
                this.board[cell[1]][cell[0]].occupiedName = shipObj.name
                const $cell = this.$board.children().eq(column).children().eq(row)
                console.log("placing in cell", $cell)
                const $shipSegment = $('<img>').addClass("shipsegment").attr("src", "img/shipsegment.png")
                if (shipObj.back === 0 && shipObj.front === 0) {
                    $shipSegment.addClass("rotate90")
                }
                if (shipObj.name.search("AWS") != -1) {
                    $cell.append($shipSegment)
                }
            }
            if (shipObj.name.search("AWS") != -1) {
                const shipNameID = shipObj.name.replaceAll(" ", "")
                const $box = $('<div>').append($('<p>').text(shipObj.name))
                $box.attr("id", shipNameID).addClass("shipHealth")
                console.log(mainObjs.currentShipPlaceIndex)
                const $img = $('<img>').attr("src", "img/ship" + this.currentShipIndex + ".png").addClass("shipImg")
                $box.append($img)
                this.currentShipIndex++
                $('.ships').append($box)
            }
            else if (shipObj.name.search("BMX") != -1) {
                const $img = $('<img>').attr("src", "img/shipsegment.png").addClass("enemy")
                $('#enemyShips').append($img)
            }
            shipObj.coordinates = coordinatesToCheck
            console.log(shipObj)
            return true
        }
        return false
    }
    // placeShipManually(shipObj, middleCoor) {
    //     const [column, row] = splitCoordinates(middleCoor)
    //     const placedCoordinates = []
    //     console.log("row: ", row, "column: ", column)
    //     if (!this.board[row][column].occupiedName) {
    //         this.board[row][column].occupiedName = shipObj.name
    //         placedCoordinates.push([row, column])
    //         console.log(this.board[row][column].occupiedName)

    //         for (let front = 1; front <= shipObj.front; front++) {
    //             if (!this.board[row][column - front].occupiedName) {
    //                 this.board[row][column - front].occupiedName = shipObj.name
    //                 placedCoordinates.push([row, column - front])
    //             }
    //             else {
    //                 console.log("occupied")
    //                 break
    //             }
    //             //console.log(this.board[row][column - front].occupiedName)
    //         }
    //         for (let back = 1; back <= shipObj.back; back++) {
    //             if (!this.board[row][column + back].occupiedName) {
    //                 this.board[row][column + back].occupiedName = shipObj.name
    //                 placedCoordinates.push([row, column + back])
    //             }
    //             else {
    //                 console.log("occupied")
    //                 break
    //             }
    //             //console.log(this.board[row][column + back].occupiedName)
    //         }
    //         for (let left = 1; left <= shipObj.left; left++) {
    //             if (!this.board[row - left][column].occupiedName) {
    //                 this.board[row - left][column].occupiedName = shipObj.name
    //                 placedCoordinates.push([row - left, column])
    //             }
    //             else {
    //                 console.log("occupied")
    //                 break
    //             }
    //             //console.log(this.board[row - left][column].occupiedName)
    //         }
    //         for (let right = 1; right <= shipObj.right; right++) {
    //             if (!this.board[row + right][column].occupiedName) {
    //                 this.board[row + right][column].occupiedName = shipObj.name
    //                 placedCoordinates.push([row + right, column])
    //             }
    //             else {
    //                 console.log("occupied")
    //                 break
    //             }
    //             console.log(this.board[row + right][column].occupiedName)
    //         }
    //         if (placedCoordinates.length != (shipObj.front + shipObj.back + shipObj.right + shipObj.left + 1)) {
    //             console.log(placedCoordinates)
    //             console.log("ship cannot be placed")
    //             for (const coordinates of placedCoordinates) {
    //                 this.board[coordinates[0]][coordinates[1]].occupiedName = ""
    //             }
    //             return false
    //         }
    //         console.log("success")
    //         for (const cell of placedCoordinates) {
    //             console.log(cell)
    //             this.updateCell([cell[1], cell[0]], "ship")
    //         }
    //         shipObj.coordinates = placedCoordinates
    //         console.log(shipObj)
    //         return true
    //     }
    //     else {
    //         console.log("origin is occupied")
    //         return false
    //     }
    // }
    //placement
    attackEnemy(selectedCoordinates, targetPlayer) {
        console.log("enemy attacks")
        console.log(selectedCoordinates)
        const [column, row] = splitCoordinates(selectedCoordinates)
        //console.log('#'+this.owner)
        const id = '#' + this.owner
        const $target = $(id).children().eq(column).children().eq(row)
        console.log($target)
        console.log($target.attr("class"))
        if ($target.attr("class").search("missed") !== -1 || $target.attr("class").search("damaged") !== -1) {
            console.log("already targeted")
            return false
        }
        if (this.board[row][column].occupiedName !== "") {
            $target.addClass("damaged")
            const shipName = this.board[row][column].occupiedName
            console.log(targetPlayer)
            targetPlayer.fleet.find(element => element.name === shipName)
            console.log(shipName)
            console.log(targetPlayer.fleet.find(element => element.name == shipName))
            const shipObj = targetPlayer.fleet.find(element => element.name == shipName)
            const shipAlive = shipObj.getDamaged()
            const shipNameID = '#' + shipObj.name.replaceAll(" ", "")
            console.log($(shipNameID), shipNameID)
            $(shipNameID).eq(0).children().eq(1).effect("shake", { direction: "right", times: 5, distance: 7 })
            //$(shipNameID).effect("highlight", {color: 'orange'}, 800)
            console.log(shipAlive)
            if (!shipAlive) {
                $(shipNameID).effect("highlight", {color: 'red'}, 800)
                setTimeout(() => { $(shipNameID).children().eq(1).addClass("destroyedImg") }, 200)
                targetPlayer.shipDestroyed(shipObj.name)
                console.log("your battleship sunk")
                //alert("your battleship sunk")
                for (const cell of shipObj.coordinates) {
                    console.log(cell)
                    this.updateCell([cell[0], cell[1]], "dead")
                }
            }
            else {
                $(shipNameID).effect("highlight", {color: 'orange'}, 800)
            }
            return [true, "hit"]
        }
        else {
            $target.addClass("missed")
            return true
        }
        // console.log(this.board)
        //console.log($target.attr("class"))

    }
    attack(selectedCoordinates, targetPlayer) {
        console.log("player attacks")
        const [column, row] = splitCoordinates(selectedCoordinates)
        //console.log('#'+this.owner)
        const id = '#' + this.owner
        const $target = $(id).children().eq(column).children().eq(row)
        console.log($target)
        console.log($target.attr("class"))
        if ($target.attr("class").search("missed") !== -1 || $target.attr("class").search("damaged") !== -1) {
            console.log("already targeted")
            return false
        }
        if (this.board[row][column].occupiedName !== "") {
            $target.addClass("damaged")
            const shipName = this.board[row][column].occupiedName
            console.log(targetPlayer)
            targetPlayer.fleet.find(element => element.name === shipName)
            console.log(shipName)
            console.log(targetPlayer.fleet.find(element => element.name == shipName))
            const shipObj = targetPlayer.fleet.find(element => element.name == shipName)
            const shipAlive = shipObj.getDamaged()
            console.log(shipAlive)

            if (!shipAlive) {
                targetPlayer.shipDestroyed(shipObj.name)
                console.log("you sunk my battleship")
                //alert("you sunk my battleship")
                // for (const cell of shipObj.coordinates) {
                //     console.log(cell)
                //     this.updateCell([cell[0], cell[1]], "dead")
                // }
            }
            return [true, "hit"]
        }
        else {
            $target.addClass("missed")

            return true
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
        if (this.right === 0 && this.left === 0) {
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
        if (this.right === 0 && this.left === 0) {
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
    getDamaged() {
        this.health--
        return this.checkAlive()
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
            if (this.prefix === "BMX") {
                $('#enemyShips').children().eq(-1).effect("shake", { direction: "right", times: 5, distance: 10 })
                setTimeout(() => { $('#enemyShips').children().eq(-1).remove() }, 1000)


            } else if (this.prefix === "AWS") {
                const shipNameID = "#" + this.fleet[index].name.replaceAll(" ", "")
                console.log($(shipNameID).children())
                
                //.css("filter","grayscale(100%)")
            }
            this.fleet.splice(index, 1,)

        }
        else {
            console.error("cannot remove a ship which does not exist")
        }
    }
    checkRemainingFleet() {
        console.log(this.fleet)
        if (this.fleet.length <= 0) {
            console.log("fleet destroyed")
            return false
        }
        return true
    }
}