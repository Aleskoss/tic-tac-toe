const gameBoard = (function() {
  const gameBoard = ["O","X","O","X","O","O","O","X","O"]
  const getGameBoard = () => {return gameBoard}
  return {getGameBoard}
})()

function getPlayers(playerOne,playerTwo){
  const displayPlayers = () => {console.log(`${playerOne} has O - ${playerTwo} has X`)}
  return {displayPlayers}
}

function checkGameLogic(){
  const checkLogic = () => {
    [a,b,c,d,e,f,g,h,i] = gameBoard.getGameBoard()
    let valueCheck = (value) => value === "O"
    if([a,b,c].every(valueCheck) || [d,e,f].every(valueCheck) || [g,h,i].every(valueCheck)){
      return "Player One wins"
    }else{
      return "Player Two wins"
    }
  }
  return {checkLogic}
}
const players = getPlayers("Aleš","Tony")
const logicCheck = checkGameLogic()