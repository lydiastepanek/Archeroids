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
    this.pos = [ pos[0] + vel[0] , pos[1] + vel[1]];
    this.pos = Asteroids.Game.wrap(this.pos)
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    dist = Asteroids.Util.dist(this.pos, otherObject.pos)
    return ((this.radius + otherObject.radius) < dist) ? false : true
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
  };

  MovingObject.prototype.relocate =  function(){
    this.pos = Asteroids.Util.randomPos(500);
    this.vel = [0,0];
  };

  MovingObject.prototype.power =  function(impulse){
    var velX = this.vel[0] + impulse[0]
    var velY = this.vel[1] + impulse[1]
    this.vel = [velX, velY];
  };



})();
