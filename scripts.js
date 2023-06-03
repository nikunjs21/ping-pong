function setPaddlePosition(position){
    let topPaddle = document.querySelector(".topPaddle");
    let bottomPaddle = document.querySelector(".bottomPaddle");
    topPaddle.style.left = position.toFixed(2) + "px";
    bottomPaddle.style.left = position.toFixed(2) + "px";
}

let ball = document.querySelector(".ball");
let ballDiam = ball.offsetHeight || ball.offsetWidth;

let ballContainer = document.querySelector(".ball-container");
let containerHeight = ballContainer.offsetHeight;
let containerWidth = ballContainer.offsetWidth;

function setBallPosition(top, left) {
    let ball = document.querySelector(".ball");
    ball.style.left = left.toFixed(2) + "px";
    ball.style.top = top.toFixed(2) + "px";
}

const paddleWidthPercentage = 30;

var screenWidth = Math.max(document.documentElement.clientWidth || 0, window.clientWidth || 0);
var paddleWidth = paddleWidthPercentage * screenWidth / 100;

var currentPosition = screenWidth - ((screenWidth / 2) + (paddleWidth / 2));
setPaddlePosition(currentPosition);

setBallPosition(containerHeight - ballDiam, currentPosition + (paddleWidth / 2) - (ballDiam / 2));
// console.log("left", currentPosition);


const onePercentOfScreen = screenWidth / 100;
document.onkeydown = function(e){
    console.log("Keydown", e.keyCode);
    if(e.keyCode == 37) {
        console.log(currentPosition);
        currentPosition -= onePercentOfScreen;
        setPaddlePosition(currentPosition);
    }
    if(e.keyCode == 39) {
        currentPosition += onePercentOfScreen;
        setPaddlePosition(currentPosition);
    }
    if (e.keyCode === 13) {
        // Start the game when Enter key is pressed
        moveBall();
    }
}

var wallDirection = getRandomDirection();
var toPaddleDirection;

function moveBall() {
    let ball = document.querySelector(".ball");
    let ballContainer = document.querySelector(".ball-container");
    let bottomPaddle = document.querySelector(".bottomPaddle");
    let ballTop = ball.offsetTop;
    let ballLeft = ball.offsetLeft;
    let ballRadius = ball.offsetWidth / 2;
    let bottomPaddleWidth = bottomPaddle.offsetWidth;
    let topPaddleWidth = bottomPaddle.offsetWidth;

    let containerHeight = ballContainer.offsetHeight;
    let containerWidth = ballContainer.offsetWidth;

    if(!toPaddleDirection){
        toPaddleDirection = "top";
    }

    if(wallDirection === "left"){
        setBallPosition(Math.random() * containerHeight, 0);
        setTimeout(function() {
            if(toPaddleDirection === "top"){
                setBallPosition(0, randomInteger(0, containerWidth));
                toPaddleDirection = "bottom";
            }
            else {
                setBallPosition(containerHeight, randomInteger(0, containerWidth));
                toPaddleDirection = "top";
            }
            wallDirection = "right";
            moveBall();
        }, 3000);
    }else if(wallDirection === "right"){
        setBallPosition(Math.random() * containerHeight,containerWidth);
        setTimeout(function() {
            if(toPaddleDirection === "top"){
                setBallPosition(0, randomInteger(0, containerWidth));
                toPaddleDirection = "bottom";
            }
            else {
                setBallPosition(containerHeight, randomInteger(0, containerWidth));
                toPaddleDirection = "top";
            }
            wallDirection = "left";
            moveBall();
        }, 3000);
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
    const directions = ["left", "right"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}