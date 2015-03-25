(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "black";
  var RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(pos, game) {
    var vel = Asteroids.Util.randomVec(3);
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);


})();
