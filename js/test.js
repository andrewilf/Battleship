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
    //board1.board[9][7].occupiedName = "filled"               always height, width
    //board1.updateCell("A5", "placeable")
    //board1.checkPlaceShip(cruiser, "E5")
    //$('.grid').hover((()=>{board1.checkPlaceShip(cruiser)}),(()=>{console.log("down")}))
    //$('.grid').hover((()=>{console.log("up")}),(()=>{console.log("down")}))
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
    $('.grid').on("wheel", (
        test1
    ))
    $('.grid').on("wheel", (() => {
        cruiser.rotateClockwise()
        console.log($(this).children())
        //test1() 
    }))
    $('.grid').on("wheel", (
        test
    ))

    // $('.grid').on("click", (
    //     test1
    // ))
    $('.grid').on("click", placeShipDown)

    })