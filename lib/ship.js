(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "aqua";
  var RADIUS = 15;

  var Ship = Asteroids.Ship = function(pos, game) {
    this.vel = [0,0]
    this.game = game;
    this.pos = pos;
    this.radius = RADIUS;
    this.direction = [-1, 0];
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: this.vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.explode =  function(){
    Asteroids.gameView.stop();
    this.radius = this.radius * 2;
    this.color = "yellow";
    this.draw(Asteroids.ctx);
    $("#points-status").html("You've been hit!")
    // setTimeout(function () {
    //   this.relocate();
    // }.bind(this), 400);
    setTimeout(function () {
      this.relocate();
      this.game.relocateAsteroids();
      Asteroids.gameView.start();
      $("#points-status").html("")
    }.bind(this), 1000);
  };

  Ship.prototype.relocate =  function(){
    this.color = COLOR;
    this.pos = Asteroids.Util.randomPos(this.game.DIM_X);
    this.vel = [0,0];
    this.radius = RADIUS;
  };

  Ship.prototype.power =  function(reverse){
    var POWER = .5;
    var impulse;
    if (!reverse) {
      impulse = this.direction.multiply(POWER);
      this.vel = this.vel.add(impulse);
    } else {
      this.vel = this.vel.multiply(1 - POWER);
    }
  };

  Ship.prototype.fireBullet =  function(){
    var bulletVelX = this.direction[1] * 10
    var bulletVelY = this.direction[0] * 10
    var vel = [bulletVelX, bulletVelY]
    var arrowPoint = this.pos.edge(this.direction, this.radius)
    var bullet = new Asteroids.Bullet(arrowPoint, this.game, vel);
    this.game.addBullet(bullet);
  };

  Ship.prototype.rotateLeft = function() {
    this.direction = this.direction.rotate((Math.PI / 25));
  };

  Ship.prototype.rotateRight = function() {
    this.direction = this.direction.rotate((Math.PI / 25) * -1);
  };

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0],this.pos[1]);
    ctx.rotate(this.direction.angle() * -1);

    ctx.strokeStyle = this.color;
    ctx.beginPath();
    var degree = this.radius;

    ctx.moveTo(0, degree);
    ctx.quadraticCurveTo(10,degree,degree + 5,-degree);
    ctx.lineTo(-degree - 5,-degree);
    ctx.quadraticCurveTo(-10,degree,0,degree);
    ctx.lineTo(0,-(degree) - 10);

    ctx.lineWidth=5;
    ctx.stroke();
    ctx.restore();
  };

})();
