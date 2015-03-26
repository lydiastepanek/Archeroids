(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "blue";
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
    this.radius = this.radius * 2;
    this.draw(Asteroids.ctx);
    setTimeout(function () {
      this.radius = this.radius * 2;
      this.draw(Asteroids.ctx);
    }.bind(this), 200);
    setTimeout(function () {
      this.radius = this.radius * 2;
      this.draw(Asteroids.ctx);
    }.bind(this), 200);
    setTimeout(function () {
      this.relocate();
      gameView.start();
    }.bind(this), 200);
  }

  Ship.prototype.relocate =  function(){
    this.pos = Asteroids.Util.randomPos(500);
    this.vel = [0,0];
    this.radius = RADIUS;
  };

  Ship.prototype.power =  function(impulse){
    var velX = this.vel[0] + impulse[0]
    var velY = this.vel[1] + impulse[1]
    this.vel = [velX, velY];
  };

  Ship.prototype.fireBullet =  function(){
    vel = [(this.vel[0] * 2) + .1, (this.vel[1] * 2) + .1]
    var bullet = new Asteroids.Bullet(this.pos, this.game, vel);
    this.game.addBullet(bullet);
  };

})();
