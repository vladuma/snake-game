var s;
var sl = 20;

var food;

var lastPressedKey;

function setup() {
  createCanvas(30*sl, 30*sl);
  s = new Snake();
  frameRate(10);
  foodLocation();
}

function draw() {
  background(51);
  s.death();
  s.update();
  s.show();

  if (s.eat(food)) {
    foodLocation();
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
  }
}

function foodLocation(){
  var cols = floor(width/sl);
  var rows = floor(height/sl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(sl);
}

function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;

  this.total = 0;
  this.tail = [];

  this.update = function(){
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*sl;
    this.y = this.y + this.yspeed*sl;

    if (this.x > width - sl) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height - sl) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }

    // this.x = constrain(this.x, 0, width - sl);
    // this.y = constrain(this.y, 0, height - sl);
  }

  this.dir = function(x, y){
      this.xspeed = x;
      this.yspeed = y;
  }

  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      // console.log(this.total);
      return true;
    } else {
      return false;
    }
  }

  this.death = function(){
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);

      if (d < 1) {
        this.total = 0;
        this.tail = [];
      }
    }
  }

  this.show = function(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, sl, sl);
    }
    rect(this.x, this.y, sl, sl);
  }
}
