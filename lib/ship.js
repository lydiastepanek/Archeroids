(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var COLOR = "blue";
  var RADIUS = 15;

  var Ship = Asteroids.Ship = function (pos) {
    // console.log(pos)
    this.pos = pos;
    this.vel = [0,0]
    Asteroids.MovingObject.call(this, {color: COLOR, radius: 15, pos: this.pos,
      vel: this.vel})
  };

  // Ship.prototype.relocate =  function(){
  //   this.pos = Asteroids.Util.randomPos(500);
  //   this.vel = [0,0];
  // };
  //
  // Ship.prototype.power =  function(impulse){
  //   var velX = this.vel[0] + impulse[0]
  //   var velY = this.vel[1] + impulse[1]
  //   this.vel = [velX, velY];
  // };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject)
})();
