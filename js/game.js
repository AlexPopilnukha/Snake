let canvas = document.querySelector('#game')
let context=canvas.getContext("2d")

let ground= new Image()
ground.src="img/grass6.png"

let foodImg= new Image()
foodImg.src="img/mouse.png"

let box =32
let score = 0
let gameOver="Game Over"
let tryAgain=document.querySelector('#tryAgain')

let food={
    x:Math.floor((Math.random()*17+1))*box,
    y:Math.floor((Math.random()*15+3))*box,
}

let snake = []
snake[0]={
    x:9*box,
    y:10*box,
}

let dir;

document.addEventListener("keydown", direction)
function direction(event){
    if (event.keyCode==37&&dir!=='right'){
        dir='left'
    }
    if (event.keyCode==38&&dir!=='down'){
        dir='up'
    }
    if (event.keyCode==39&&dir!=='left'){
        dir='right'
    }
    if (event.keyCode==40&&dir!=='up'){
        dir='down'
    }
}

function drawGame(){
    context.drawImage(ground,0,0)
    context.drawImage(foodImg,food.x,food.y)


    for (let i =0;i<snake.length;i++){
        context.fillStyle = "red"
        context.fillRect(snake[i].x, snake[i].y, box,box)
    }
    context.fillStyle = 'white'
    context.font='50px Aerial'
    context.fillText(score,box*2.5,box*1.5)

    let snakeX=snake[0].x
    let snakeY=snake[0].y
    if (snakeX==food.x&&snakeY==food.y) {
        score += 1

        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        }
    }
        else{
            snake.pop()
        }



        if (snakeX<box||snakeX>box*17||snakeY<2*box||snakeY>box*17){
            clearInterval(gameSetInterval)
            context.fillStyle = 'white'
            context.font='50px Aerial'
            context.fillText(gameOver,box*6,box*10)
            tryAgain.style.visibility='visible'

        }


    if(dir=='left'){
        snakeX-=box
    }
    if(dir=='right'){
        snakeX+=box
    }
    if(dir=='down'){
        snakeY+=box
    }
    if(dir=='up'){
        snakeY-=box
    }
   let newHead={
        x:snakeX,
       y:snakeY
   }
    snake.unshift(newHead)

    function tail(){
        for(let i=1;i<snake.length;i++){
            if (newHead.x==snake[i].x &&newHead.y== snake[i].y){
                clearInterval(gameSetInterval)
                context.fillStyle = 'white'
                context.font='50px Aerial'
                context.fillText(gameOver,box*6,box*10)
                tryAgain.style.visibility='visible'

            }
        }
    }
    tail()

}
tryAgain.onclick=function (){
    location.reload()
}

let gameSetInterval = setInterval(drawGame,200)