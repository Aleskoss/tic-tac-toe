const gameBoard = (function() {
  const gameBoard = []
  const getGameBoard = () => {return gameBoard}
  return {getGameBoard}
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
      return "Player One wins"
    }else if(checkedArr.includes("XXX")){
      return "Player Two wins"
    }else{
      return "Continue"
    }
}
 return {checkGame}
}

const render = (function(){
  const renderBoard = () => {
    const board = document.querySelector(".gameBoard")
    for(let i = 0; i < 9; i++){
      const square = document.createElement("input")
      square.type = "checkbox"
      square.id = i
      board.appendChild(square)
      }
    }
    return {renderBoard}
})()
const players = getPlayers("Aleš","Tony")
const game = checkWinner()
render.renderBoard()