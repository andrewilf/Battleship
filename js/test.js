//to test code functions

const App = {

}

const Display = {

}

$(() => {
    $('[data-toggle="tooltip"]').tooltip()
    const cruiser = new Ship("submarine", "test1", 5)
    console.log(cruiser)
    const player1 = new Player("A.W.S.")
    player1.createFleet()
    const board1 = new Board(8, 10, player1.prefix)
    board1.generateVisual()
    cruiser.rotateClockwise()
    board1.placeShipManually(cruiser, "E7")
    let currentShip = player1.fleet[0]
    let currentShipIndex = 0

    function hoverOver() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.checkPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
    }
    function hoverOff() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.refreshPlaceShip(currentShip, $(this).eq(0).attr("coordinate"))
    }
    function viewName() {
        const [column, row] = splitCoordinates($(this).eq(0).attr("coordinate"))
        //console.log($(this).eq(0).attr("coordinate"))
        console.log(board1.board[row][column].occupiedName)
        $('#currentShip').text(board1.board[row][column].occupiedName)
    }
    function AttackCell() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.attack($(this).eq(0).attr("coordinate"))
    }
    function placeShipDown() {
        console.log($(this).eq(0).attr("coordinate"))
        const successfulPlace = board1.placeShip(currentShip, $(this).eq(0).attr("coordinate"))
        if (currentShipIndex > player1.fleet.length - 2) {
            $('.grid').off("click", placeShipDown)
            $('.grid').off("wheel", hoverOver)
            $('.grid').off("wheel", hoverOff)
            $('.grid').off()
            $('.grid').hover(viewName)
            $('.grid').on("click", AttackCell)
        }
        else if (successfulPlace) {
            currentShipIndex++
            currentShip = player1.fleet[currentShipIndex]
        }
    }
    $('.grid').hover(hoverOver, hoverOff)
    $('.grid').on("wheel", hoverOff)
    $('.grid').on("wheel", (() => {
        currentShip.rotateClockwise()
        console.log($(this).children())
        console.log(player1.fleet[currentShipIndex])
    }))
    $('.grid').on("wheel", hoverOver)
    $('.grid').on("click", placeShipDown)


    board1.attack("D5")

})