var origBoard;
const huPlayer='X';
const aiPlayer ='O';
const winCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const cells=document.querySelectorAll('.cell')
startGame()

function startGame(){
    document.querySelector(".endgame").style.display="none";
    origBoard=Array.from(Array(9).keys())
    for(var i=0;i<cells.length;i++){
        cells[i].innerText=''
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false)
    }
}

function turnClick(square){
    if(typeof origBoard[square.target.id]=='number'){
        turn(square.target.id,huPlayer)
        if(!checkTie()&&!checkWin(origBoard,huPlayer)){
             setTimeout(function(){
                turn(bestSpot(),aiPlayer)
      },200)
    }
}
}
 

function turn(squareId,player){
    origBoard[squareId]=player
    document.getElementById(squareId).innerText=player
    let gameWon=checkWin(origBoard,player)
    if(gameWon) gameOver(gameWon)
}

function checkWin(board,player){
    let plays=board.reduce((a, e, i) =>
    (e===player)?a.concat(i) : a, []);
  let gameWon=null
  for(let [index,win] of winCombos.entries() ){
    if(win.every(elem => plays.indexOf(elem) > -1)){
gameWon={index: index,player : player}
break;
    }
  }
return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=
        gameWon.player ==huPlayer ? " rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)";
    }
    for(var i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turnClick,false)
    }
    declareWinner(gameWon.player==huPlayer ? "You Win!" : "Abster Wins!")
    
}

function declareWinner(who){
    document.querySelector(".endgame").style.display='flex'
    document.querySelector(".endgame .text").innerText = who
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number')
}

function bestSpot(){
    return emptySquares()[0];
}
function checkTie(){
    if (emptySquares().length === 0 && !checkWin(origBoard, huPlayer) && !checkWin(origBoard, aiPlayer)){
        for(var i=0;i<cells.length;i++){
            cells[i].style.backgroundColor ="transparent";
            cells[i].removeEventListener('click',turnClick,false)
           
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false;
}



