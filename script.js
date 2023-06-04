/**
 * Canvas and Context
 */
const canvas = document.getElementById('container')
const context = canvas.getContext("2d")

/**
 * Objects
 */
const ball = {
    radius: 8,
    positionX: canvas.width / 2 + 8,
    positionY: canvas.height / 2 + 8,
    velocityX: 2,
    velocityY: 2,
    color: 'white'
}

const topPlayer = {
    height: 10,
    width: 100,
    positionX: canvas.width / 2 - 100 / 2,
    positionY: 10,
    color: 'white',
    player: 'top',
    speed: 2
}

const bottomPlayer = {
    height: 10,
    width: 100,
    positionX: canvas.width / 2 - 100 / 2,
    positionY: canvas.height - 20,
    color: 'white',
    player: 'bottom',
    speed: 2
}

/**
 * Game
 */
const game = {
    topScore: 0,
    bottomScore: 0,
    turn: 0,
    maxScore: 5,
    speedIncreaseHit: 3,
}

const keyPressed = {
    A: false,
    D: false,
    Left: false,
    Right: false
}

let activated = true;
let hits = 0;

/**
 * Update and Draw
 */
function drawTopPlayer() {
    context.beginPath();
    context.fillStyle = topPlayer.color;
    context.rect(topPlayer.positionX, topPlayer.positionY, topPlayer.width, topPlayer.height);
    context.fill();
    context.closePath();
}

function drawBottomPlayer() {
    context.beginPath();
    context.fillStyle = bottomPlayer.color;
    context.rect(bottomPlayer.positionX, bottomPlayer.positionY, bottomPlayer.width, bottomPlayer.height);
    context.fill();
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.fillStyle = ball.color;
    context.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

function drawAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTopPlayer();
    drawBottomPlayer();
    drawBall()
}

function resetBall() {
    ball.positionX = canvas.width / 2 + 8
    ball.positionY = canvas.height / 2 + 8

    let velocityX = ball.velocityX
    let velocityY = ball.velocityY

    ball.velocityX = 0
    ball.velocityY = 0

    setTimeout(() => {
        ball.velocityX = -velocityX
        ball.velocityY = -velocityY
    }, 1000)
}


function collisionTimeLag() {
    activated = false
    console.log('Deactivated Collision')
    setTimeout(() => {
        activated = true
        console.log('Ready For Collision')
    }, 1000)
}

function setScore() {
    let winner = localStorage.getItem("winner");
    let winnerName = "";
    let winnerScore = 0;
    if (ball.positionY > canvas.height - (bottomPlayer.height + ball.radius)) {
        winnerName = "Johnny";
        winnerScore = game.topScore;
        // game.topScore++;
        // resetBall();

        if(winner){
            winner = JSON.parse(winner);
            winner.winner = winnerName;
            winner.score = winnerScore;
            if(winner.highScorer.score <= winnerScore){
                winner.highScorer.name = winnerName;
                winner.highScorer.score = winnerScore;
            }
        }else{
            winner = {
                winner: winnerName,
                score: winnerScore,
                highScorer: {
                    name: winnerName,
                    score: winnerScore,
                }
            }
        }
        localStorage.setItem("winner", JSON.stringify(winner));

        window.location.href = "winner.html";
        resetGame();
    } else if (ball.positionY < topPlayer.height + ball.radius) {
        winnerName = "Jack";
        winnerScore = game.bottomScore;

        if(winner){
            winner = JSON.parse(winner);
            winner.winner = winnerName;
            winner.score = winnerScore;
            if(winner.highScorer.score <= winnerScore){
                winner.highScorer.name = winnerName;
                winner.highScorer.score = winnerScore;
            }
        }else{
            winner = {
                winner: winnerName,
                score: winnerScore,
                highScorer: {
                    name: winnerName,
                    score: winnerScore,
                }
            }
        }
        localStorage.setItem("winner", JSON.stringify(winner));

        // game.bottomScore++;
        // resetBall();
        window.location.href = "winner.html";
        resetGame();
    }

    document.getElementsByClassName('top')[0].textContent = game.topScore;
    document.getElementsByClassName('bottom')[0].textContent = game.bottomScore;
}

function gameOver(){
    // if(game.topScore === game.maxScore){
    //     console.log('Left Wins')
    //     localStorage.setItem("winner", "Johnny");
    //     window.location.href = "winner.html";
    //     resetGame()
    // }else if(game.bottomScore === game.maxScore){
    //     console.log('Right Wins')
    //     localStorage.setItem("winner", "Jack");
    //     window.location.href = "winner.html";
    //     resetGame()
    // }
}


function resetGame(){
    game.topScore = 0
    game.bottomScore = 0
    ball.positionX = 0
    ball.positionY = 0
    updateDefault()
}


function updateKeyPresses() {
    if (keyPressed['A']) {
        if (topPlayer.positionX > 0) {
            topPlayer.positionX -= topPlayer.speed;
        }
    }
    if (keyPressed['D']) {
        if (topPlayer.positionX < canvas.width - topPlayer.width) {
            topPlayer.positionX += topPlayer.speed;
        }
    }
    if (keyPressed['A']) {
        if (bottomPlayer.positionX > 0) {
            bottomPlayer.positionX -= bottomPlayer.speed;
        }
    }
    if (keyPressed['D']) {
        if (bottomPlayer.positionX < canvas.width - bottomPlayer.width) {
            bottomPlayer.positionX += bottomPlayer.speed;
        }
    }
}

function updateStates() {
    if ((ball.positionX + ball.radius) >= canvas.width || (ball.positionX - ball.radius) <= 0) {
        ball.velocityX = -ball.velocityX;
    }

    let bottomPlayerHits = (ball.positionY + ball.radius >= canvas.height - (bottomPlayer.height + 10) &&
        (ball.positionX >= bottomPlayer.positionX && ball.positionX <= bottomPlayer.positionX + bottomPlayer.width));

    let topPlayerHits = (ball.positionY - ball.radius <= (topPlayer.height + 10) &&
        (ball.positionX >= topPlayer.positionX && ball.positionX <= topPlayer.positionX + topPlayer.width));

    if (bottomPlayerHits || topPlayerHits) {

        if(bottomPlayerHits) game.bottomScore++;
        if(topPlayerHits) game.topScore++;

        if (activated) {
            hits++;
            ball.velocityY = -ball.velocityY;
            collisionTimeLag();
        }
    }

    setScore();
    gameOver();

    if (hits === game.speedIncreaseHit) {
        hits = 0;
        ball.velocityX += 0.2;
        ball.velocityY += 0.2;
        topPlayer.speed += 0.2;
        bottomPlayer.speed += 0.2;

        console.log(ball.velocityX, topPlayer.speed);
    }

    ball.positionX += ball.velocityX;
    ball.positionY += ball.velocityY;
}

/**
 * Key Listeners
 */
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    if (code === 'KeyD') {
        keyPressed['D'] = true;
    }
    if (code === 'KeyA') {
        keyPressed['A'] = true;
    }
}, false);

document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;
    if (code === 'KeyD') {
        keyPressed['D'] = false;
    }
    if (code === 'KeyA') {
        keyPressed['A'] = false;
    }
}, false);

/**
 * Game Loop and Render
 */
function gameLoop() {
    updateKeyPresses()
    updateStates()
    drawAll()
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

/**
 * Support
 */
function updateDefault() {
    canvas.width = Math.min(window.innerWidth * 0.6, 800);
    canvas.height = Math.min(window.innerHeight * 0.8, 600);

    ball.positionX = canvas.width / 2 + ball.radius;
    ball.positionY = canvas.height / 2 + ball.radius;

    topPlayer.positionX = canvas.width / 2 - topPlayer.width / 2;
    topPlayer.positionY = 10;

    bottomPlayer.positionX = canvas.width / 2 - bottomPlayer.width / 2;
    bottomPlayer.positionY = canvas.height - (bottomPlayer.height + 10);
}

function resizeHandler() {
    if (window.innerWidth < 560) {
        document.getElementsByClassName('small-device')[0].style.display = "flex";
        document.getElementsByClassName('canvas-container')[0].style.display = "none";
    } else {
        document.getElementsByClassName('small-device')[0].style.display = "none";
        document.getElementsByClassName('canvas-container')[0].style.display = "flex";
    }

    updateDefault()

    topPlayer.positionX = canvas.width / 2 - topPlayer.width / 2;
    bottomPlayer.positionX = canvas.width / 2 - bottomPlayer.width / 2;
}

resizeHandler()
window.addEventListener('resize', () => { resizeHandler() })