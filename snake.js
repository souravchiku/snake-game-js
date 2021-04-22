var canvas = document.getElementById('snake');
var display = document.getElementById('display');
var sdis = document.getElementById('score')
var ctx = canvas.getContext("2d");
const grid=32;
ctx.fillStyle="red"

var score=0;


// ctx.fillRect(32,42,32,32)
// ctx.strokeStyle="blue"
// ctx.strokeRect(20,20,32,32)
// ctx.drawImage(g,0,0)

//load image
var g= document.getElementById('ground-img');
const beerImg = new Image();

beerImg.src="food.png"
// console.log(beerImg)
let snake = []

snake[0]={
    x:9*grid,
    y:10*grid,
}

let beer = {
    x : Math.floor(Math.random()*17+1)*grid, //total 19 rows but we are ignoring 2 rows first and last (17)
    y : Math.floor(Math.random()*15+1)*grid, //total 17 column but same logic

}
let d;
document.addEventListener('keydown',(e)=>{
    // console.log(e.keyCode)
    let key = e.keyCode;
    // let d;
    if( key == 37 && d !="right"){
        d="left"
      }else if(key == 38 && d != "down"){
        d="up"
      }else if(key == 39 && d != "left"){
        d="right"
      }else if(key == 40 && d != "up"){
        d="down"
      }
    console.log(d);
    console.log(score)
})

function Restart(){
    snake = []

    snake[0]={
        x:9*grid,
        y:10*grid,
}
d=""
display.innerText=""
    game = setInterval(draw,100)
}
function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        } 
    }
    return false;
}

function draw(){

    ctx.drawImage(g,0,0);

    for(let i=0;i<snake.length ;i++){
        ctx.fillStyle=(i==0)?"red" :"black";
        ctx.fillRect(snake[i].x,snake[i].y,grid,grid)
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y,grid,grid)
    }

     ctx.drawImage(beerImg,beer.x,beer.y)

        let  snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
    // console.log(snakeX)
    if(d=="left") snakeX -=grid;
    if(d=="up") snakeY -=grid;
    if(d=="right") snakeX +=grid;
    if(d=="down") snakeY +=grid;

    // remove from last array
    if(snakeX == beer.x && snakeY == beer.y){
        score++;
        sdis.innerHTML=score
        
        beer = {
            x : Math.floor(Math.random()*17+1)*grid, //total 19 rows but we are ignoring 2 rows first and last (17)
            y : Math.floor(Math.random()*15+1)*grid, //total 17 column but same logic
        
        }
        
    }else{
        snake.pop();
    }
    let newpos = {
        x : snakeX,
        y : snakeY
    }

    if(snakeX  < grid || snakeX > 17*grid || snakeY < grid  || snakeY>15*grid || collision(newpos,snake)){
        display.innerText=`Game is over`
        clearInterval(game)
        
        
    }

    snake.unshift(newpos); // add at the front of array
}

var game = setInterval(draw,100)