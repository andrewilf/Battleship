//to test code functions

const App = {

}

const Display = {

}

$(() => {
    $('[data-toggle="tooltip"]').tooltip()
    const cruiser = new Ship("submarine", "test1", 5)
    const cruiser2 = new Ship("submarine", "test2", 5)
    //console.log(cruiser)
    const player1 = new Player("A.W.S.")
    player1.createFleet()
    const board1 = new Board(10, 12, player1.prefix)
    board1.generateVisual()
    cruiser.rotateClockwise()
    cruiser2.rotateClockwise()
    //board1.placeShipManually(cruiser, "E7")
    //board1.placeShipManually(cruiser2, "C7")
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
            setTimeout(()=>{wheelWait = true}, 800)
        }
        else if (wheelCounter < -2 && wheelWait === true) {
            board1.refreshPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
            currentShip.rotateClockwise()
            board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
            wheelCounter = 0
            wheelWait = false
            setTimeout(()=>{wheelWait = true}, 800)
        }
    }
    function viewName() {
        const [column, row] = splitCoordinates($(this).eq(0).attr("coordinate"))
        //console.log($(this).eq(0).attr("coordinate"))
        //console.log(board1.board[row][column].occupiedName)
        $('#currentShip').text(board1.board[row][column].occupiedName)
    }
    function AttackCell() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.attack($(this).eq(0).attr("coordinate"), player1)
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
            $('.grid').hover(viewName)
            $('.grid').on("click", AttackCell)
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

    board1.attack("D5", player1)
    board1.attack("D5", player1)
    board1.attack("E9", player1)

    const player2 = new Player("B.M.X.")
    player2.createFleet()

    const board2 = new Board(10, 15)
    board2.generateVisual()
    player2PlaceShips()
    function player2PlaceShips() {
        //for ()
    }

})