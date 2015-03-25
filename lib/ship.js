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
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: this.vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate =  function(){
    this.pos = Asteroids.Util.randomPos(500);
    this.vel = [0,0];
  };

  Ship.prototype.power =  function(impulse){
    var velX = this.vel[0] + impulse[0]
    var velY = this.vel[1] + impulse[1]
    this.vel = [velX, velY];
  };

  Ship.prototype.fireBullet =  function(){
    var bullet = new Asteroids.Bullet(this.pos, this.game, this.vel);
    this.game.addBullet(bullet);
  };

})();
