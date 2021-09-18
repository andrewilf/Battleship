const App = {

}

const Display = {

}


const board = new Board(10, 10)   //3 width, 2 height
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
console.log(player1)

console.log(shipNames.asignName())
console.log(shipNames.takenNames)
player1.rollCall()
player1.addShip("submarine", "test",)
player1.shipDestroyed("A.W.S. test")

graphicBoard = new DisplayGrid(board, "player1")
graphicBoard.generateGrid()
$(() => {
    graphicBoard = new DisplayGrid(board, "player1")
    graphicBoard.generateGrid()
    $allGrid = $('.grid').hover(hoverOver, hoverOut)

    visualShip = new DisplayShip(cruiser)
    visualShip.generateShip()
    cruiser.rotateClockwise()
    visualShip.regenerateShip()
    console.log(visualShip)
    // visualShip2 = new DisplayShip(cruiser)
    // visualShip2.generateShip()
    // console.log(String.fromCharCode(69))
//     $('.ship').on( 'wheel', function(){
//         visualShip2.rotateShip()
//          })

})