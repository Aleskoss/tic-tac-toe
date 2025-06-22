const gameBoard = (function() {
  const gameBoard = []
  const getGameBoard = () => {return gameBoard}
  const getCountX = () => {return gameBoard.reduce((accumulator,item) => {
    if(item === "X"){
     accumulator += 1
    }
    return accumulator
  },0)}
  const getCountO = () => {
    return gameBoard.reduce((accumulator,item) => {
    if(item === "O"){
     accumulator += 1
    }
    return accumulator
  },0)}
  const gameState = checkWinner()
  const checkInput = () => {
    const square = document.querySelectorAll('.gameboard-div')
    square.forEach(item => item.addEventListener("click",() => {
      if(getCountX() >= getCountO()){
        item.textContent = "O"
        gameBoard[item.id] = "O"
      }else if(getCountO() > getCountX()){
        item.textContent = "X"
        gameBoard[item.id] = "X"
      }
      if(gameState.checkGame() === "X" || gameState.checkGame() === "O"){
        render.outputWinner()
        gameBoard.splice(0,gameBoard.length)
        render.renderBoard()
      }
      item.disabled = true
    }))
  }
  return {getGameBoard,checkInput}
})()

function getPlayers(playerOne,playerTwo){
  const displayPlayers = () => {console.log(`${playerOne} has O - ${playerTwo} has X`)}
  return {displayPlayers}
}

function checkWinner(){
  const checkGame = () => {
    const indexCheck = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    const checkedArr = []
    for(let i = 0; i < 8; i++){
    checkedArr.push(indexCheck[i].reduce((accumulator,currentValue) => {
      return accumulator + gameBoard.getGameBoard()[currentValue]
    },""))
  }
    if(checkedArr.includes("OOO")){
      return "O"
    }else if(checkedArr.includes("XXX")){
      return "X"
    }
  }
   return {checkGame}
}
const render = (function(){
  const renderBoard = () => {
    const board = document.querySelector(".gameboard")
    while(board.lastChild){
      board.removeChild(board.lastChild)
    }
    for(let i = 0; i < 9; i++){
      const square = document.createElement("button")
      square.classList = "gameboard-div"
      square.type = "button"
      square.id = i
      board.appendChild(square)
      }
      gameBoard.checkInput()
    }
  const outputWinner = () => {
   const winnerOutput = document.querySelector('p')
   const gameState = checkWinner()
   if(gameState.checkGame() === "O"){
      winnerOutput.textContent = "Player One wins"
    }else if(gameState.checkGame() === "X"){
      winnerOutput.textContent =  "Player Two wins"
    }
  }
    return {renderBoard,outputWinner}
})()
const players = getPlayers("Aleš","Tony")
const game = checkWinner()
render.renderBoard()