// for main game

const mainObjs = {
    player1: "",
    player2: "",
    board1: "",
    board2: "",

    currentShipPlace: "",
    currentShipPlaceIndex: "",
    initPlayers: () => {
        this.player1 = new Player("AWS")
        this.player2 = new Player("BMX")
        this.player1.createFleet()
        this.player2.createFleet()
    },
    initBoard: () => {
        this.board1 = new Board(8, 8, this.player1.prefix)
        this.board2 = new Board(8, 8, this.player2.prefix)
        this.board1.generateVisual()
        this.board2.generateVisual()
    },
    PlaceShipsPlayer1: () => {
        currentShipPlace = player1.fleet[0]
        currentShipPlaceIndex = 0
        $('.' + player1.prefix).hover(this.hoverOver, this.hoverOff)
    },
    placeShipsPlayer2: () => {
        let success = false
        for (ship of this.player2.fleet) {
            console.log(ship)
            while (success === false) {
                let randomNumber = Math.ceil(Math.random() * 9)
                let randomLetter = String.fromCharCode(Math.ceil(Math.random() * 9) + 65)
                let randomrotation = Math.ceil(Math.random() * 2) - 1
                if (randomrotation === 1) {
                    ship.rotateClockwise()
                }
                //console.log(randomrotation)
                //console.log(randomLetter + randomNumber)
                success = board2.placeShip(ship, (randomLetter + randomNumber))
                console.log(success)
            }
            success = false
        }
        //board2.hideShipCells()            //disabled for now, to hide the ship cells from player1
    },
    hoverOver: () => {
        console.log("asd")
        this.board1.checkPlaceShip(this.currentShipPlace, $(this).eq(0).attr("coordinate"))
    },
    hoverOff: () => {
        console.log("gg")
        this.board1.refreshPlaceShip(this.currentShipPlace, $(this).eq(0).attr("coordinate"))
    },

}



const events = {




}

$(() => {
    mainObjs.initPlayers()
    mainObjs.initBoard()
    mainObjs.PlaceShipsPlayer1()
    mainObjs.placeShipsPlayer2()
})



// function hoverOver() {
//     //console.log($(this).eq(0).attr("coordinate"))
//     //if (wheelCounter === 0) {
//     board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
//     wheelCounter = 0
//     //}
//     //wheelCounter = 0
// }
// function hoverOff() {
//     //console.log($(this).eq(0).attr("coordinate"))
//     //if (wheelCounter === 0) {
//     board1.refreshPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
//     wheelCounter = 0
//     //}
// }