//to test code functions

const App = {

}

const Display = {

}

$(() => {
    const cruiser = new Ship("submarine", "test1", 5)
    //cruiser.rotateClockwise()
    console.log(cruiser)
    const board1 = new Board(8, 10, "player1")
    board1.generateVisual()
    cruiser.rotateClockwise()
    board1.placeShipManually(cruiser,"E7")
    //board1.board[9][7].occupiedName = "filled"               always height, width

    $('.grid').hover(test, test1)
    function test() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.checkPlaceShip(cruiser, $(this).eq(0).attr("coordinate"))
    }
    function test1() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.refreshPlaceShip(cruiser, $(this).eq(0).attr("coordinate"))
    }
    function placeShipDown() {
        console.log($(this).eq(0).attr("coordinate"))
        board1.placeShip(cruiser, $(this).eq(0).attr("coordinate"))
    }
    $('.grid').on("dblclick", (
        test1
    ))
    $('.grid').on("dblclick", (() => {
        cruiser.rotateClockwise()
        console.log($(this).children())
    }))
    $('.grid').on("dblclick", (
        test
    ))

//    $('.grid').on("click", placeShip)

    })