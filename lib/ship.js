(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "white";
  var RADIUS = 15;

  var Ship = Asteroids.Ship = function(pos, game) {
    this.vel = [0,0]
    this.game = game;
    this.pos = pos;
    this.radius = RADIUS;
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: this.vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.explode =  function(){
    gameView.stop();
    Asteroids.ctx.save()
    setTimeout(function () {
      this.radius = this.radius * 2;
      this.color = "red";
      this.draw(Asteroids.ctx);
      $("#win-status").html("You've been hit!")
    }.bind(this), 300);
    setTimeout(function () {
      this.relocate();
      gameView.start();
    }.bind(this), 400);
    setTimeout(function () {
      $("#win-status").html("")
    }.bind(this), 1000);  }

  Ship.prototype.relocate =  function(){
    this.color = COLOR;
    this.pos = Asteroids.Util.randomPos(500);
    this.vel = [0,0];
    this.radius = RADIUS;
  };

  Ship.prototype.power =  function(impulse){
    var velX = this.vel[0] + impulse[0]
    var velX = Math.sign(velX) * Math.min(Math.abs(velX), 10);
    var velY = this.vel[1] + impulse[1]
    var velY = Math.sign(velY) * Math.min(Math.abs(velY), 10);
    this.vel = [velX, velY];
  };

  Ship.prototype.fireBullet =  function(){
    var bulletVelX = this.vel[0] * 2
    var bulletVelY = this.vel[0] === 0 && this.vel[1] === 0 ? -10 : (this.vel[1] * 2)
    var vel = [bulletVelX, bulletVelY]
    var bullet = new Asteroids.Bullet(this.pos, this.game, vel);
    this.game.addBullet(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0],this.pos[1]);

    if (Math.sign(this.vel[1]) < 0) {
      var angle = Math.sign(this.vel[1]) * Math.atan2(-1 * this.vel[0], -1 * this.vel[1]);
    } else if (this.vel[0] < 0 && this.vel[1] === 0) {
      var angle = -1.57079632679;
    } else if (this.vel[0] > 0 && this.vel[1] === 0) {
      var angle = 1.57079632679;
    } else {
      var angle = Math.sign(this.vel[1]) * Math.atan2(this.vel[0], -1 * this.vel[1]);
    };

    ctx.rotate(angle);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    var degree = this.radius;
    ctx.moveTo(0, -degree);
    ctx.quadraticCurveTo(5,-degree,10,degree * 2);
    ctx.lineTo(-10,degree * 2);
    ctx.quadraticCurveTo(-5,-degree,0,-degree);
    ctx.lineTo(0,degree * 2);

    ctx.lineWidth=2;
    ctx.stroke();
    ctx.restore();
  };

})();
