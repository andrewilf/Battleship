//to test code functions

const App = {

}

const Display = {

}


const board = new Board(8, 8)   //3 width, 2 height
console.log(board)

const cruiser = new Ship("cruiser", "test", 5)
console.log(cruiser)

// cruiser.rotateClockwise()
// console.log(cruiser)

// cruiser.rotateClockwise()
// console.log(cruiser)
// cruiser.rotateClockwise()
// console.log(cruiser)
// cruiser.rotateClockwise()
// console.log(cruiser)

const player1 = new Player("A.W.S.")
player1.createFleet()
// console.log(player1)

// console.log(shipNames.asignName())
// console.log(shipNames.takenNames)
player1.rollCall()
player1.addShip("submarine", "test",)
player1.shipDestroyed("A.W.S. test")

graphicBoard = new DisplayGrid(board, "player1")
graphicBoard.generateGrid()
//board.placeShip(cruiser, "E3")
//board.placeShip(cruiser, "E6")
$(() => {
    graphicBoard = new DisplayGrid(board, "player1")
    graphicBoard.generateGrid()
    $allGrid = $('.grid').hover(shipHoverOver, hoverOut)

    $clickPlace = $('.grid').click(() => {
        console.log(currentTile)
        board.placeShip(cruiser, currentTile)
        graphicBoard.updateGrid()
    })
    visualShip = new DisplayShip(cruiser)
    visualShip.generateShip()
    cruiser.rotateClockwise()
    visualShip.regenerateShip()
    console.log(visualShip)
    const submarine = new Ship("submarine", "test2", 4)
    visualShip2 = new DisplayShip(submarine)
    visualShip2.generateShip()
    
    //const fleetTest = [visualShip2, visualShip]
        // $('.ship').on('dblclick', function () {
    //     index = fleetTest.findIndex((element) => element.shipObj.name === $(this).attr('id'))

    //     fleetTest[index].shipObj.rotateClockwise()
    //     fleetTest[index].regenerateShip()
    // })
    // $('.ship').on('mousedown', function () {
    //     console.log("down")
    // })
    // $('.ship').on('mouseup', function () {
    //     console.log("up")
    // })
    
    // $(window).on("mousewheel",function(){
    //     cruiser.rotateClockwise()
    //   });


})