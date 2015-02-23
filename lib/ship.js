(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "blue";
  var RADIUS = 15;
  var pos = Asteroids.Util.randomPos(500)

  var Ship = Asteroids.Ship = function () {
    console.log(pos)
    Asteroids.MovingObject.call(this, {color: COLOR, radius: 15, pos: pos,
      vel: [0,0]})
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject)
})();
