var s;
var sl = 20;

var food;
var scoreCount = 0;

var lastPressedKey;

var restartCounter = 0,
    gameOverCounter = 0;

function setup() {
  var game = createCanvas(30*sl, 30*sl);
  game.parent('game-left')
  s = new Snake();
  frameRate(10);
  foodLocation();
  buttons();
}

function draw() {
  background(51);
  s.death();
  s.update();
  s.show();

  if (s.eat(food)) {
    foodLocation();
    updateScore();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, sl, sl)
}

function keyPressed() {
  if (keyCode === UP_ARROW && lastPressedKey !== 'DOWN') {
    s.dir(0, -1);
    lastPressedKey = 'UP';
  } else if (keyCode === DOWN_ARROW && lastPressedKey !== 'UP') {
    s.dir(0, 1);
    lastPressedKey = 'DOWN';
  } else if (keyCode === LEFT_ARROW && lastPressedKey !== 'RIGHT') {
    s.dir(-1, 0);
    lastPressedKey = 'LEFT';
  } else if (keyCode === RIGHT_ARROW && lastPressedKey !== 'LEFT') {
    s.dir(1, 0);
    lastPressedKey = 'RIGHT';
  } else if (key === 'p') {
    pause();
  } else if (key === 'r') {
    restart();
  }
}

function foodLocation(){
  var cols = floor(width/sl);
  var rows = floor(height/sl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(sl);

  if (food.x === s.x && food.y === s.y) {
    foodLocation();
  }

  for (var i = 0; i < s.tail.length; i++) {
    if (food.x === s.tail[i].x && food.y === s.tail[i].y) {
      foodLocation();
    }
  }
}

var restartButton = document.getElementsByClassName('restart');
var scoreBoard = document.getElementsByClassName('score');
var pauseButton = document.getElementsByClassName('pause');
var overlay = document.createElement('div');

function buttons(){
  var xDirection = s.xspeed,
      yDirection = s.yspeed;

  for (var i = 0; i < restartButton.length; i++) {
    restartButton[i].addEventListener('click', restart);
  }
  for (var i = 0; i < pauseButton.length; i++) {
    pauseButton[i].addEventListener('click', pause);
  }

  overlay.style.display = 'none';
}

function updateScore(){
  scoreCount++;

  scoreBoard[0].innerText = scoreCount;
}

function restart(){
  setup();
}

function pause(){
  if (restartCounter % 2) {
    s.dir(xDirection, yDirection);
    for (var i = 0; i < pauseButton.length; i++) {
      pauseButton[i].innerText = 'Pause (P)';
    }
  } else {
    xDirection = s.xspeed;
    yDirection = s.yspeed;
    s.dir(0, 0);
    for (var i = 0; i < pauseButton.length; i++) {
      pauseButton[i].innerText = 'Resume (P)';
    }
  }
  restartCounter++;
}

function gameOver(){
  s.dir(0, 0);
  pause();
  var GObutton = document.createElement('div');
  GObutton.classList.add('button');
  GObutton.innerText = 'Restart Game (R)';
  GObutton.addEventListener('click', setup);

  var GOtext = document.createElement('h3');
  GOtext.classList.add('go-text');
  GOtext.innerText = 'GAME OVER';

  overlay.setAttribute("id", "game-over-overlay");

  if (gameOverCounter === 0) {
    overlay.appendChild(GOtext);
    overlay.appendChild(GObutton);

    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  gameOverCounter++;
}
