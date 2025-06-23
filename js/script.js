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
  const fillGameBoard = (square) => {
        gameBoard.splice(0,gameBoard.length)
        square.forEach(item => {
        gameBoard.push(item.textContent)
      })
    }
  const gameState = checkWinner()
  const resetGameBoard = () => {
    if(gameState.checkGame() === "X" || gameState.checkGame() === "O" || !(gameBoard.includes(""))){
          render.outputWinner()
          gameBoard.splice(0,gameBoard.length)
          render.renderBoard()
    }
  }
  const events = ["click","mouseover"]
  return {getGameBoard,getCountO,getCountX,fillGameBoard,resetGameBoard}
})()

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
      board.appendChild(square)
      }
      checkInput()
      hoverEffect()
      hoverEffectReset()
    }
    let playerOneName = "Player1"
    let playerTwoName = "Player2"
    const displayPlayers = () => {
    const playerOne = document.querySelector('#player-one')
    const playerTwo = document.querySelector('#player-two')
    const startBtn = document.querySelector('#start-btn')
    const playerNamesOutput = document.querySelector('.player-names')
    startBtn.addEventListener("click", () => {
      renderBoard()
      playerOneName = playerOne.value
      playerTwoName = playerTwo.value
      playerNamesOutput.textContent = `${playerOneName} has O and ${playerTwoName} has X` 
    })
  }
  const decideNextPlayer = (square) => {
      if(gameBoard.getCountX() >= gameBoard.getCountO()){
          square.textContent = "O"
        }else if(gameBoard.getCountO() > gameBoard.getCountX()){
          square.textContent = "X"
        }
      }
  const getSquares = () => { return document.querySelectorAll('.gameboard-div')}
  const checkInput = () => {
    getSquares().forEach(item => item.addEventListener("click",() => {
      decideNextPlayer(item)
      gameBoard.fillGameBoard(getSquares())
      gameBoard.resetGameBoard()
      item.disabled = true
    }))
  }
  const hoverEffect = () => {
    getSquares().forEach(item => item.addEventListener("mouseover",() => {
      if(!(item.disabled)){
      decideNextPlayer(item)
      }
    }))
  }
  const hoverEffectReset = () => {
    getSquares().forEach(item => item.addEventListener("mouseout",() => {
      if(!(item.disabled)){
      item.textContent = ""
      }
    }))
  }
  const outputWinner = () => {
   const winnerOutput = document.querySelector('p')
   const gameState = checkWinner()
   if(gameState.checkGame() === "O"){
      winnerOutput.textContent = `${playerOneName} Wins`
    }else if(gameState.checkGame() === "X"){
      winnerOutput.textContent =  `${playerTwoName} Wins`
    }
  }
    return {renderBoard,decideNextPlayer,displayPlayers,getSquares,checkInput,outputWinner}
})()
const game = checkWinner()
render.renderBoard()
render.displayPlayers()