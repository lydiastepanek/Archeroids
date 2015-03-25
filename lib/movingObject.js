(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    // this.isWrappable = true;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    )

    ctx.fill();
  };

  MovingObject.prototype.move = function(){
    var vel = this.vel;
    var pos = this.pos;
    this.pos = [pos[0] + vel[0] , pos[1] + vel[1]];
    if (Asteroids.Game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = Asteroids.Game.wrap(this.pos)
      } else {
        this.game.remove(this)
      };
    };
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    dist = Asteroids.Util.dist(this.pos, otherObject.pos)
    return ((this.radius + otherObject.radius) < dist) ? false : true
  };

  MovingObject.prototype.isWrappable = true;

  // MovingObject.prototype.collideWith = function(otherObject) {
  //   this.game.remove(this);
  //   this.game.remove(otherObject);
  // };

})();
