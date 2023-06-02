function setPaddlePosition(position){
    let topPaddle = document.querySelector(".topPaddle");
    let bottomPaddle = document.querySelector(".bottomPaddle");
    topPaddle.style.left = position.toFixed(2) + "px";
    bottomPaddle.style.left = position.toFixed(2) + "px";
}


const paddleWidthPercentage = 30;

var screenWidth = Math.max(document.documentElement.clientWidth || 0, window.clientWidth || 0);
var paddleWidth = paddleWidthPercentage * screenWidth / 100;

var currentPosition = screenWidth - ((screenWidth / 2) + (paddleWidth / 2));
setPaddlePosition(currentPosition);
// console.log("left", currentPosition);


const onePercentOfScreen = screenWidth / 100;
document.onkeydown = function(e){
    if(e.keyCode == 37) {
        console.log(currentPosition);
        currentPosition -= onePercentOfScreen;
        setPaddlePosition(currentPosition);
    }
    if(e.keyCode == 39) {
        currentPosition += onePercentOfScreen;
        setPaddlePosition(currentPosition);
    }
}