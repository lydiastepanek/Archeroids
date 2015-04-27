(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var Util = Asteroids.Util = function () {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate(){ this.constructor = ChildClass  };
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  }

  Util.randomVec = function(length) {
    var x = Math.floor(Math.random() * length) + 1;
    var y = Math.floor(Math.random() * length) + 1;
    if(Math.random() > .5 ){
      x = x * -1
    }
    if(Math.random() > .5 ){
      y = y * -1
    }
    return [x,y]
  }

  Util.randomPos = function(length) {
    var x = Math.floor(Math.random() * length);
    var y = Math.floor(Math.random() * length);
    return [x,y]
  }

  Util.dist = function(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1],2))
  }

  Number.prototype.mod = function(n) {
    return ((this % n ) + n ) % n; 
  }

})();
