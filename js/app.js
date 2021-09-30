// for main game
const mainObjs = {
    selectedDifficulty: '',
    player1: "",
    player2: "",
    board1: "",
    board2: "",

    wheelCounter: 0,
    wheelFlag: false,
    wheelWait: true,

    currentShipPlace: "",
    currentShipPlaceIndex: "",
    initPlayers: () => {
        selectedDifficulty = difficulty.easy
        console.log(selectedDifficulty)
        this.player1 = new Player("AWS")
        this.player2 = new Player("BMX")
        this.player1.createFleet()
        this.player2.createFleet()
    },
    initBoard: () => {
        this.board1 = new Board(selectedDifficulty[0], selectedDifficulty[1], this.player1.prefix)
        this.board2 = new Board(selectedDifficulty[2], selectedDifficulty[3], this.player2.prefix)
        this.board1.generateVisual()
        this.board2.generateVisual()
    },
    PlaceShipsPlayer1: () => {
        currentShipPlace = player1.fleet[0]
        currentShipPlaceIndex = 0
        $('.' + player1.prefix).hover(hoverOverPlacing, hoverOffPlacing)
        $('.' + player1.prefix).on("click", placeShipDown)
        document.querySelector('div').addEventListener("wheel", wheelSpin)
        //$('.' + player1.prefix).on("wheel", hoverOffPlacing)
        $('.' + player1.prefix).on("wheel", rotateShip)
        //$('.' + player1.prefix).on("wheel", hoverOverPlacing)
    },
    placeShipsPlayer2: () => {
        let success = false
        for (ship of this.player2.fleet) {
            console.log(ship)
            while (success === false) {
                let randomNumber = Math.ceil(Math.random() * board2.height)
                let randomLetter = String.fromCharCode(Math.ceil(Math.random() * board2.width) + 65)
                let randomrotation = Math.ceil(Math.random() * 2) - 1
                if (randomrotation === 1) {
                    ship.rotateClockwise()
                }
                //console.log(randomrotation)
                //console.log(randomLetter + randomNumber)
                success = board2.placeShip(ship, (randomLetter + randomNumber))
                console.log("was the ship successfully placed?: ", success)
            }
            success = false
        }
        //board2.hideShipCells()            //disabled for now, to hide the ship cells from player1
    },
    attackPlayer1: () => {
        //$('.' + player1.prefix).hover(viewNamePlayer)
        //$('.' + player2.prefix).hover(viewName2)
        //$('.' + player2.prefix).off("click", player2AttackShips)
        $('.' + player2.prefix).on("click", AttackCell)
        if (player1.fleet.length === 1) {
            heartbeat.play()
            heartbeat.loop = true
        }
        //board2.hideShipCells()
        $('.grid').hover(HoverOverAttack, HoverOffAttack)
        setTimeout(() => { Narrate("Your turn to attack") }, 1000)
    },
    attackPlayer2: () => {

        $('.' + player2.prefix).off("click", AttackCell)
        setTimeout(() => { player2AttackShips() }, 1000)

        //$('.' + player2.prefix).on("click", player2AttackShips)
    },
    gameOver: () => {
        if (player1.checkRemainingFleet() && player2.checkRemainingFleet()) {
            return true
        }
        else {
            $('.' + player2.prefix).off("click", AttackCell)
            board2.RevealAllShips()
            heartbeat.pause()
            return false
        }
    }


}

function hoverOverPlacing() {
    //if (mainObjs.wheelCounter === 0) {
    board1.checkPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
    mainObjs.wheelCounter = 0
    //clickHover.pause();
    clickHover.currentTime = 0;
    clickHover.play()
    //play()
    //}
    //mainObjs.wheelCounter = 0
}
function hoverOffPlacing() {
    //if (mainObjs.wheelCounter === 0) {
    board1.refreshPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
    mainObjs.wheelCounter = 0
    //}
    //mainObjs.wheelCounter = 0
}

function placeShipDown() {
    board1.clearAllhoverCells()
    const successfulPlace = board1.placeShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
    if (successfulPlace) {
        //placeDrum.pause();
        placeDrum.currentTime = 0;
        placeDrum.play()
    }

    board1.checkPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))

    wheelCounter = 0
    if (successfulPlace && currentShipPlaceIndex < player1.fleet.length) {
        board1.refreshPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
        currentShipPlaceIndex++
        currentShipPlace = player1.fleet[currentShipPlaceIndex]
    }
    if (currentShipPlaceIndex == player1.fleet.length) {
        $('.' + player1.prefix).off()
        document.querySelector('div').removeEventListener("wheel", wheelSpin)
        mainObjs.attackPlayer1()
    }
}

function wheelSpin(event) {
    event.preventDefault()
    let edge = Math.ceil(event.deltaY / 8)
    if (edge > 5) {
        edge = 1
        if (mainObjs.wheelCounter < 0) {
            mainObjs.wheelCounter = 0
        }
    }
    else if (edge < -2) {
        edge = -1
        if (mainObjs.wheelCounter > 0) {
            mainObjs.wheelCounter = 0
        }
    }
    console.log(edge)
    mainObjs.wheelCounter += edge

    console.log(mainObjs.wheelCounter)
}

function rotateShip() {
    //wheelCounter++
    console.log(mainObjs.wheelCounter)
    if (mainObjs.wheelCounter > 2 && mainObjs.wheelWait === true) {
        board1.clearAllhoverCells()
        board1.refreshPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
        currentShipPlace.rotateAntiClockwise()
        board1.checkPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
        mainObjs.wheelCounter = 0
        mainObjs.wheelWait = false
        setTimeout(() => { mainObjs.wheelWait = true }, 800)
    }
    else if (mainObjs.wheelCounter <= -2 && mainObjs.wheelWait === true) {
        board1.clearAllhoverCells()
        board1.refreshPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
        currentShipPlace.rotateClockwise()
        board1.checkPlaceShip(currentShipPlace, $(this).eq(0).attr("coordinate"))
        mainObjs.wheelCounter = 0
        mainObjs.wheelWait = false
        setTimeout(() => { mainObjs.wheelWait = true }, 800)
    }
}

function AttackCell() {
    //console.log($(this).eq(0).attr("coordinate"))
    if (mainObjs.gameOver()) {
        const attack = board2.attack($(this).eq(0).attr("coordinate"), player2)
        console.log(attack)
        if (attack) {
            //gunfire1.pause();

            if (!mainObjs.gameOver()) {

                //alert("game over, you win")

                setTimeout(() => {
                    Narrate("Game over, you win!")
                    victory.play()
                }, 2000)
            }
            if (attack[1] !== "hit") {
                attackmissed.currentTime = 0
                attackmissed.play()
                mainObjs.attackPlayer2()
            }
            else if (attack[1] !== "missed") {

                gunfire1.currentTime = 0
                gunfire1.play()
            }
        }
    }

}
function HoverOverAttack() {
    $(this).eq(0).addClass("selected")
    //clickHover.pause();
    clickHover.currentTime = 0;
    clickHover.play()
    //console.log($(this).eq(0))
}
function HoverOffAttack() {
    $(this).eq(0).removeClass("selected")
}

function player2AttackShips() {
    if (mainObjs.gameOver()) {
        //alert("game continues")
        let success = false
        //while (success === false) {
        const randomNumber = Math.ceil(Math.random() * board1.height)
        const randomLetter = String.fromCharCode(Math.ceil(Math.random() * board1.width) + 64)
        //console.log(randomLetter+random)
        success = board1.attackEnemy(randomLetter + randomNumber, player1)
        if (success) {
            //gunfire1.pause();

        }
        if (success[1] === "hit") {
            gunfire1.currentTime = 0;
            gunfire1.play()
            success = "again"
        }
        else if (success[1] === "missed") {
            attackmissed.currentTime = 0;
            attackmissed.play()
        }
        if (!mainObjs.gameOver()) {
            //alert("game over, you lose")
            console.log("game over, you lose")

            setTimeout(() => {
                Narrate("game over, you lose")
                defeat.play()
            }, 2000)


        }
        if (success === "again") {
            setTimeout(player2AttackShips, 1500)
        } else if (success === false) {
            player2AttackShips()
        } else if (mainObjs.gameOver()) {
            mainObjs.attackPlayer1()
        }
        //}
        // console.log("game over?: ", mainObjs.gameOver())

    }


}
// load()
// load2()
$(() => {
    // const button = document.createElement('button')
    // button.innerHTML = "toggle music"
    // button.addEventListener("click", (() => {
    //     //console.log($('#bgm')[0].paused)
    //     if (!$('#bgm')[0].paused) {
    //         $('#bgm')[0].pause()
    //     }
    //     else {
    //         $('#bgm')[0].load()
    //         $('#bgm')[0].play()
    //     }
    // }))
    // document.body.append(button)
    mainObjs.initPlayers()
    mainObjs.initBoard()
    mainObjs.placeShipsPlayer2()
    mainObjs.PlaceShipsPlayer1()
    Narrate("Place Your 5 ships")
    $('#restart').on("click", restart)



})

function restart() {

    $('#main').empty()
    $("#enemyShips").empty()
    $("#ships").empty()
    shipNames.clearTakenNames()

    mainObjs.initPlayers()
    mainObjs.initBoard()
    mainObjs.placeShipsPlayer2()
    mainObjs.PlaceShipsPlayer1()
    //$('#textscroll').text("restart")
    Narrate("Restarting now")
    setTimeout(() => { Narrate("Place Your 5 ships") }, 1100)
}