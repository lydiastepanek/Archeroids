(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  Array.prototype.angle = function() {
    return Math.atan2(this[1],this[0]);
  };

  Array.prototype.rotate = function(theta) {
    var x = this[0] * Math.cos(theta) - this[1] * Math.sin(theta);
    var y = this[0] * Math.sin(theta) + this[1] * Math.cos(theta);

    return [x, y];
  };

  Array.prototype.add = function(vec2) {
    var x = this[0] + vec2[1];
    var y = this[1] + vec2[0];

    return [x, y];
  };

  Array.prototype.multiply = function(factor) {
    var x = this[0] * factor;
    var y = this[1] * factor;

    return [x, y];
  };

  Array.prototype.edge = function(direction, radius) {
    var theta = direction.angle() * -1;
    theta = theta + (Math.PI / 2)
    var x = this[0] + Math.cos(theta) * radius
    var y = this[1] + Math.sin(theta) * radius

    return [x, y];
  };

})();
