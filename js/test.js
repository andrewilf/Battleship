//to test code functions
/*
const App = {

}

const Display = {

}

$(() => {
    $('[data-toggle="tooltip"]').tooltip()
    const cruiser = new Ship("submarine", "test1", 5)
    const cruiser2 = new Ship("submarine", "test2", 5)
  
    const player1 = new Player("AWS")
    player1.createFleet()
    const board1 = new Board(10, 12, player1.prefix)
    board1.generateVisual()
    cruiser.rotateClockwise()
    cruiser2.rotateClockwise()

    console.log(player1)
    let currentShip = player1.fleet[0]
    let currentShipIndex = 0

    function hoverOver() {
        //console.log($(this).eq(0).attr("coordinate"))
        //if (wheelCounter === 0) {
        board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
        wheelCounter = 0
        //}
        //wheelCounter = 0
    }
    function hoverOff() {
        //console.log($(this).eq(0).attr("coordinate"))
        //if (wheelCounter === 0) {
        board1.refreshPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
        wheelCounter = 0
        //}
    }
    function rotateShip() {
        //wheelCounter++
        console.log(wheelCounter)
        if (wheelCounter > 2 && wheelWait === true) {
            board1.refreshPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
            currentShip.rotateAntiClockwise()
            board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
            wheelCounter = 0
            wheelWait = false
            setTimeout(() => { wheelWait = true }, 800)
        }
        else if (wheelCounter < -2 && wheelWait === true) {
            board1.refreshPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
            currentShip.rotateClockwise()
            board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
            wheelCounter = 0
            wheelWait = false
            setTimeout(() => { wheelWait = true }, 800)
        }
    }
    function viewNamePlayer() {
        const [column, row] = splitCoordinates($(this).eq(0).attr("coordinate"))
        //console.log($(this).eq(0).attr("coordinate"))
        //console.log(board1.board[row][column].occupiedName)
        $('#currentShip').text(board1.board[row][column].occupiedName)
    }
    function viewNameEnemy() {
        const [column, row] = splitCoordinates($(this).eq(0).attr("coordinate"))
        //console.log($(this).eq(0).attr("coordinate"))
        //console.log(board1.board[row][column].occupiedName)
        $('#currentShip').text(board2.board[row][column].occupiedName)
    }
    function AttackCell() {
        console.log($(this).eq(0).attr("coordinate"))
        board2.attack($(this).eq(0).attr("coordinate"), player2)
        player2.checkRemainingFleet()
    }
    function HoverOverAttack() {
        $(this).eq(0).addClass("selected")
        console.log($(this).eq(0))
    }
    function HoverOffAttack() {
        $(this).eq(0).removeClass("selected")
    }
    function placeShipDown() {
        //console.log($(this).eq(0).attr("coordinate"))
        board1.clearAllhoverCells()
        const successfulPlace = board1.placeShip(currentShip, $(this).eq(0).attr("coordinate"))
        board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
        wheelCounter = 0
        if (currentShipIndex > player1.fleet.length - 2) {
            $('.grid').off("click", placeShipDown)
            $('.grid').off("wheel", hoverOver)
            $('.grid').off("wheel", hoverOff)
            $('.grid').off()
            $('.AWS').hover(viewNamePlayer)
            //$('.grid').hover(viewName2)
            //$('.grid').on("click", AttackCell)
            board2.hideShipCells()
            $('.BMX').on("click", AttackCell)
            $('.grid').hover(HoverOverAttack, HoverOffAttack)
        }
        else if (successfulPlace) {
            currentShipIndex++
            currentShip = player1.fleet[currentShipIndex]
        }
    }
    let wheelCounter = 0
    let wheelFlag = false

    $('.grid').hover(hoverOver, hoverOff)
    $('.grid').on("wheel", rotateShip)
    //$('.grid').on("wheel", hoverOff)
    // $('.grid').on("wheel", (() => {
    //     wheelCounter++
    //     wheelFlag = true
    //     //console.log(wheelCounter)
    //     if (wheelCounter > 3) {
    //         currentShip.rotateClockwise()
    //         //console.log($(this).children())
    //         //console.log(player1.fleet[currentShipIndex])
    //         wheelCounter = 0
    //         wheelFlag = false
    //     }
    // }))
    //$('.grid').on("wheel", hoverOver)
    $('.grid').on("click", placeShipDown)
    //$('.grid').on("mousewheel", wheelSpin)
    let scale = 0
    let wheelWait = true
    function wheelSpin(event) {
        event.preventDefault()
        let edge = Math.ceil(event.deltaY / 8)
        if (edge > 5) {
            edge = 1
            if (wheelCounter < 0) {
                wheelCounter = 0
            }
        }
        else if (edge < -2) {
            edge = -1
            if (wheelCounter > 0) {
                wheelCounter = 0
            }
        }
        // else if(edge < 0) {
        //     edge = 0
        // }
        console.log(edge)
        // if (edge > 0) {
        //     wheelCounter += edge
        // }
        // else {
        //     wheelCounter -= edge
        // }
        wheelCounter += edge

        console.log(wheelCounter)
    }

    document.querySelector('div').addEventListener("wheel", wheelSpin)

    //board1.attack("D5", player1)
    //board1.attack("D5", player1)
    //board1.attack("E9", player1)

    const player2 = new Player("BMX")
    player2.createFleet()

    const board2 = new Board(10, 12, player2.prefix)
    board2.generateVisual()
    player2PlaceShips()
    //player2AttackShips()

    function player2PlaceShips() {
        let success = false
        //let aiShip = player2.fleet[index]
        for (ship of player2.fleet) { 
        while (success === false) {
            const random = Math.ceil(Math.random() * 9)
            const randomLetter = String.fromCharCode(Math.ceil(Math.random() * 9) + 65)
            const randomrotation = Math.ceil(Math.random() * 2) - 1
            if(randomrotation === 1) {
                ship.rotateClockwise()
            }
            console.log(randomrotation)
            console.log(randomLetter + random)
            success = board2.placeShip(ship,randomLetter + random)
        }
        success = false
    }

    
}
function player2AttackShips() {
        let success = false
        while (success === false) {
            const random = Math.ceil(Math.random() * 9)
            const randomLetter = String.fromCharCode(Math.ceil(Math.random() * 9) + 65)
            //console.log(randomLetter+random)
            success = board2.attack(randomLetter+random, player2)
        }
    }
}) */
(()=>{
// add an appropriate event listener
function highlight(elem) {
    const bgColor = 'yellow';
    elem.style.backgroundColor = bgColor;

    // create the event
    let event = new CustomEvent('highlight', {
        detail: {
            backgroundColor: bgColor
        }
    });
    // dispatch the event
    elem.dispatchEvent(event);
}

// Select the div element
let div = document.querySelector('div');

// Add border style
function addBorder(elem) {
    elem.style.border = "solid 1px red";
}

// Listen to the highlight event
div.addEventListener('click', function (e) {
    addBorder(this);

    // examine the background
    console.log(e.detail);
});

// highlight div element
highlight(div);




})


// let i = target.health
//         if (i == target.health && target.health >= 0) {
//             let elem = document.getElementById(target.healthBarID)
//             let width = target.health
//             let id = setInterval(frame, 7)
//             function frame() {
//                 if (width <= target.health - chosenWeaponDamage) {
//                     clearInterval(id)
//                     console.log(target.health)
//                     target.health -= chosenWeaponDamage
//                     checkWinner()
//                 } else {
//                     width--;
//                     elem.style.width = width + "%"
//                 }
//             }
//         }
