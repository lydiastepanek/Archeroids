(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "black";
  var RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(pos, game, vel) {
    this.game = game
    this.radius = RADIUS;
    this.vel = vel;
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0],this.pos[1]);
    // ctx.rotate(20*Math.PI/180);
    var angle = Math.sign(this.vel[1]) * Math.atan2(this.vel[0], this.vel[1])
    // ctx.rotate(angle);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(- 4.553 , 2.886);
    ctx.lineTo(4.553, 2.886);
    // ctx.lineTo(- 2.65 , .19);
    // ctx.lineTo(2.65, .19); //I think this makes it too small

    ctx.fill();
    ctx.restore();
  };

  Bullet.prototype.collideWith = function(asteroid) {
    this.game.remove(asteroid);
  };

  Bullet.prototype.isWrappable = false;

})();
