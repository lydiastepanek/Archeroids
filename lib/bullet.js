(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "black";
  var RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(pos, game, vel) {
    this.game = game
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function(asteroid) {
    this.game.remove(asteroid);
  };


})();
