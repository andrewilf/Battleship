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
        console.log(chosenDifficulty)
        selectedDifficulty = difficulty[chosenDifficulty]
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
        document.querySelector('#main').addEventListener("wheel", wheelSpin)
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
    clickHover.currentTime = 0
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
        //placeDrum.pause()
        placeDrum.currentTime = 0
        placeDrum.play()
    }
    else {
        badBlip.currentTime = 0
        badBlip.play()
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
        document.querySelector('#main').removeEventListener("wheel", wheelSpin)
        mainObjs.placeShipsPlayer2()
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
                    victory.currentTime = 0
                    victory.play()
                }, 1500)
                setTimeout(() => {
                    //backgroundMusic.pause()
                    victory.pause()
                    $('#ships').prepend($('<img>').attr("src", "img/goodguyadmiralhead.png").addClass("shipHealth"))
                    Narrate("Admiral Not Bad Guy: great job sailor.", goodBlip)
                }, 6000)
                setTimeout(() => {
                    Narrate("Admiral Not Bad Guy: now we can bring capitalism to their land.", goodBlip)
                }, 8500)
                setTimeout(() => {
                    Narrate("Admiral Not Bad Guy: and it's all thanks to you.", goodBlip)
                }, 11800)
                setTimeout(() => {
                    Narrate(":)", goodBlip)
                }, 15000)
                setTimeout(() => {
                    Narrate("Click the restart button on the top right if you want to play again.", genericBlip)
                }, 17000)
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
            gunfire2.currentTime = 0;
            gunfire2.play()
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
            setTimeout(() => {
                //backgroundMusic.pause()
                $('#ships').prepend($('<img>').attr("src", "img/badguyadmiralhead.png").addClass("shipHealth"))
                Narrate("Admiral Bad Guy: Wait I actually won? I was just firing at random.", badBlip)
            }, 5000)
            setTimeout(() => {
                Narrate("Admiral Bad Guy: Like I don't wear these sunglasses to look cool.", badBlip)
            }, 8000)
            setTimeout(() => {
                Narrate("Admiral Bad Guy: I am legally blind... you may want to get your eyes checked.", badBlip)
            }, 11000)
            setTimeout(() => {
                Narrate(">:)", badBlip)
            }, 15000)
            setTimeout(() => {
                Narrate("Click the restart button on the top right if you want to play again.", genericBlip)
            }, 17000)


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
    $('body').css('background-image', 'url(img/backgroundwgeneralbanner.png)')
    $('#textscroll').hide()
    $('h3').hide()
    // mainObjs.initPlayers()
    // mainObjs.initBoard()
    // mainObjs.placeShipsPlayer2()
    // mainObjs.PlaceShipsPlayer1()
    // Narrate("Place Your 5 ships")
    $('#restart').on("click", restart)
    $('#music').on("click", music)
    $('#sound').on("click", sound)
    $('.difficulty').on("click", startGame)
    $('#cheat').on("click", cheat)
    $('#about').on("click", about)
    $('#cheat').hide()
    // var modal = document.getElementById("myModal");

    // // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    // // When the user clicks the button, open the modal 
    // btn.onclick = function() {
    //   modal.style.display = "block";
    // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }

})

function restart() {
    $('body').css('background-image', 'url(img/backgroundwgeneralbanner.png)')
    $('#background').append($('#textscroll').css("width", "96%").css("height", "37px"))
    Narrate("")
    $('.side').remove()
    $('#restart').text("Restart")
    $('#options').show()
    $('#textscroll').hide()
    $('h3').hide()
    //sound()
    $('#main').empty()
    $("#enemyShips").empty()
    $("#ships").empty()
    shipNames.clearTakenNames()
    $('#cheat').hide()
    
    //$('#textscroll').text("restart")

}

function music() {
    console.log("music toggle")

    if (backgroundMusic.paused === true) {
        backgroundMusic.play()
    }
    else {
        backgroundMusic.pause()
    }

}

function sound() {
    console.log("sound toggle")
    if (!clickHover.muted) {
        clickHover.muted = true
        placeDrum.muted = true
        gunfire1.muted = true
        attackmissed.muted = true
        victory.muted = true
        defeat.muted = true
        heartbeat.muted = true
        genericBlip.muted = true
        goodBlip.muted = true
        badBlip.muted = true
        gunfire2.muted = true
    }
    else {
        clickHover.muted = false
        placeDrum.muted = false
        gunfire1.muted = false
        attackmissed.muted = false
        victory.muted = false
        defeat.muted = false
        heartbeat.muted = false
        genericBlip.muted = false
        goodBlip.muted = false
        badBlip.muted = false
        gunfire2.muted = false
    }
}

function startGame() {
    $('#cheat').show()
    backgroundMusic.play()
    console.log($(this).attr('mode'))
    chosenDifficulty = $(this).attr('mode')
    $('body').css('background-image', 'url(img/background.png)')
    $('#options').hide()
    $('#textscroll').show()
    $('h3').show()
    console.log("starting game")
    mainObjs.initPlayers()
    mainObjs.initBoard()

    mainObjs.PlaceShipsPlayer1()
    Narrate("Place Your 5 ships", genericBlip)
    //setTimeout(() => {  }, 1100)
}

let cheatFlag = false

function cheat() {
    if (!cheatFlag) {
        $('.ship').addClass("revealShip")
        Narrate("Cheat mode activated! Click again to turn off.", genericBlip)
        cheatFlag = true
    }
    else {
        $('.ship').removeClass("revealShip")
        cheatFlag = false
    }
}

function about() {
    $('body').css('background-image', 'url(img/background.png)')
    $('#options').hide()
    $('#background').prepend($('<div>').addClass("side").append(
        $('<img>').attr("src", "img/goodguyadmiral.png").addClass('side')).append($('#textscroll')))
    $('#textscroll').show().css("width", "60%").css("height", "210px")
    Narrate("\
    Good morning sailor, my name is Admiral Not Bad Guy and welcome to Battleship. Your mission is to command my fleet of 5 vessels and stop Admiral Bad Guy. Place your 5 vessels anywhere in your fleet zone to begin the battle. You and the enemy will take turns to attack like gentlemen, you can only attack coordinates which haven’t been fired at yet. I will not have you wasting ammo. Should you or the enemy land a hit on an opposing vessel, you will be allowed to attack again. The battle ends when either you or that milk drinker’s entire fleet is destroyed. I am counting on you sailor, capitalism itself is at stake.\
    ", genericBlip, 1)
    $('#restart').text('Back')
}