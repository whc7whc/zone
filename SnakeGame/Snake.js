//codewithharsh_
let playBoard = document.querySelector(".wrapper .play-board");

let score_val=document.querySelector(".wrapper .score .score-val");
let gameOverBox=document.querySelector(".wrapper .game-over-box");
let gameOverScore=document.querySelector(".wrapper .game-over-score");
let restartBtn=document.querySelector(".wrapper .restart-btn");


let gameEnd =false;
let foodX, foodY;
let snakeX=5,snakeY=10;
let moveX=0,moveY=0;
let snakeBody=[];
let IntervalId;
let score=0;
let createGame = () => {
if(gameEnd){
    return Endgame();
}


    //If snake & food postion is equal(如果蛇跟食物位置相等)
if(snakeX=== foodX && snakeY === foodY){
changeFoodPositon();
//Pushing food position to snake body array
snakeBody.push([snakeX,snakeY]);
score++;
score_val.innerHTML=score;
gameOverScore.innerHTML=score;
}
    //Moving Snake(移動蛇)
    snakeX += moveX;
    snakeY += moveY;

for(let i=snakeBody.length-1;i>0;i--){
    snakeBody[i]=snakeBody[i-1];
}
snakeBody[0]=[snakeX,snakeY]
//Game end when snake collide with the wall
if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameEnd = true;
    return Endgame();

}
    //Create food(創造食物)
    let li = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
    for(let i=0;i<snakeBody.length;i++){
    //Create Snake
li += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
//Checking if snake head hit the snake body,if so set gameEnd=true
if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] ===
    snakeBody[i][0]){

gameEnd=true;

    }
   
}
//Insert food div in playBoard div
playBoard.innerHTML = li;
}
//changing food position randomly(移動食物位置)
let changeFoodPositon=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}


//Change Snake direction(滑鼠移動蛇位置)
let changeDirection=(e)=>{
    if(e.classList.contains("ArrowLeft")){
moveX=-1;moveY=0;
}else if(e.classList.contains("ArrowUp")){
        moveX=0;moveY=-1;
}
else if(e.classList.contains("ArrowRight")){
        moveX=1;moveY=0;
      }else if(e.classList.contains("ArrowDown")){
        moveX=0;moveY=1;
}}
//Change Snake direction(鍵盤移動蛇位置)
// 鍵盤控制函式
let handleKeyDirection = (e) => {
    if (e.key === "ArrowLeft" && moveX !== 1) {
        moveX = -1;
        moveY = 0;
    } else if (e.key === "ArrowUp" && moveY !== 1) {
        moveX = 0;
        moveY = -1;
    } else if (e.key === "ArrowRight" && moveX !== -1) {
        moveX = 1;
        moveY = 0;
    } else if (e.key === "ArrowDown" && moveY !== -1) {
        moveX = 0;
        moveY = 1;
    }
};

// 註冊鍵盤事件
document.addEventListener("keydown", handleKeyDirection);

let Endgame=()=>{
clearInterval(IntervalId);
gameOverBox.style.display = "block";
}
restartBtn.addEventListener("click",()=>{
    location.reload();
})

changeFoodPositon();
IntervalId=setInterval(createGame,100);//蛇移動速度
createGame(); // 呼叫函式來產生食物

