// for main game

const mainObjs = () => {
    console.log("initialising main objects")
    const player1 = new Player("AWS")
    const player2 = new Player("BMX")
    player1.createFleet()
    player2.createFleet()
    const board1 = new Board(8,8, player1.prefix)
    const board2 = new Board(8,8, player2.prefix)
    board1.generateVisual()
    board2.generateVisual()
}

$(() => {
    mainObjs()
    console.log(player1)
})