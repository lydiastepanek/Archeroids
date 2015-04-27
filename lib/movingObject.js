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
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    )
    ctx.lineWidth=5;
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius / 2 + 1,
      0,
      2 * Math.PI,
      false
    )
    ctx.lineWidth=5;
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      2.5,
      0,
      2 * Math.PI,
      false
    )
    ctx.lineWidth=5;
    ctx.closePath();
    ctx.stroke();
  };

  MovingObject.prototype.move = function(){
    var vel = this.vel;
    var pos = this.pos;
    var rad = this.radius;
    this.pos = [pos[0] + vel[0] , pos[1] + vel[1]];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos)
      } else {
        this.game.remove(this)
      };
    };
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    dist = Asteroids.Util.dist(this.pos, otherObject.pos)
    return ((this.radius + otherObject.radius) <= dist) ? false : true
  };

  MovingObject.prototype.isWrappable = true;

})();
