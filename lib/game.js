(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
    this.addAsteroids();
    this.ship = new Asteroids.Ship();
    // console.log(this.ship.pos)
  };

  var DIM_X = 500;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 20;
  var asteroids = [];

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var pos = Asteroids.Util.randomPos(500);
      asteroids.push(new Asteroids.Asteroid(pos))
    }
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (el) {
      el.draw(ctx);
    })
  }

  Game.prototype.moveObjects = function (ctx) {
    ctx.clearRect;
    this.allObjects().forEach(function (el) {
      el.move();
    })
  }

  Game.wrap = function (pos) {
    if (pos[0] < 0) {
      pos[0] = DIM_X;
    } else if (pos[0] > DIM_X) {
      pos[0] = 0;
    }
    if (pos[1] < 0) {
      pos[1] = DIM_Y;
    } else if (pos[1] > DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  }

  Game.prototype.checkCollisions = function(){
    var objects = this.allObjects();
    for(var i = 0; i<objects.length; i++){
      for( var j = i + 1; j < objects.length; j++){
        if(objects[i].isCollidedWith(objects[j])){
          // objects.splice(i,1);
          // objects.splice(j - 1,1);
          // console.log("test" + (objects[20].pos))
          if (j === objects.length - 1){
            console.log("test" + (objects[20].pos))

            this.ship.pos = Asteroids.Util.randomPos(500);
            console.log(objects[20].pos)
          }
        };
      };
    };
  }

  Game.prototype.step = function(ctx){
    this.moveObjects(ctx);
    this.checkCollisions();
  }

  Game.prototype.allObjects = function(){
    console.log("all" + (this.ship.pos))

    return asteroids.concat(this.ship)
  }

})();
