(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "green";
  var RADIUS = 30;


  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    var vel = Asteroids.Util.randomVec(3);
    this.radius = RADIUS;
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: vel, game: game};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
