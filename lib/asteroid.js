(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "green";
  var RADIUS = 30;


  var Asteroid = Asteroids.Asteroid = function(pos) {
    var vel = Asteroids.Util.randomVec(3);
    options = {color: COLOR, radius: RADIUS, pos: pos, vel: vel};
    Asteroids.MovingObject.call(this, options);
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
