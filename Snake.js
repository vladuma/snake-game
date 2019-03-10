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
        // this.total = 0;
        // this.tail = [];
        gameOver();
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
