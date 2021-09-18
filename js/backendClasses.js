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

// generic Ship object. may have children classes if more specific battleships are required
class Ship {
    constructor(type, name, length, attack = 1, canons = 1) {
        this.type = type
        this.name = name
        //coordinates of the battleship. The four attributes are required to allow rotating the ship
        this.front = Math.ceil((length - 1 )/ 2)
        this.back = Math.floor((length - 1 )/ 2)
        this.right = 0
        this.left = 0
        //attack, canons, and health attribute is provided to allow other game modes once the basic game is constructed
        this.attack = attack
        this.health = length
        this.canons = canons

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