(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
    this.ships = [];
    this.asteroids = [];
    this.addAsteroids();
  };

  var DIM_X = 500;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 15;
  asteroids = []

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship(Asteroids.Util.randomPos(500),this);
    this.ships.push(ship);
    return ship
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var pos = Asteroids.Util.randomPos(500);
      this.asteroids.push(new Asteroids.Asteroid(pos, this))
    }
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.allObjects().forEach(function (el) {
      el.draw(ctx);
    })
  }

  Game.prototype.moveObjects = function (ctx) {
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
    for(var i = 0; i<objects.length - 1; i++){
      for( var j = i + 1; j < objects.length; j++){
        if(objects[i].isCollidedWith(objects[j])){
          // objects[i].collideWith(objects[j])
          if (j === objects.length - 1){
            // debugger
            this.ships[0].relocate();
            // this.ships[0].power([1,1]);
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
    return this.asteroids.concat(this.ships)
  }

  Game.prototype.remove = function(asteroid) {
    var ast_index = this.asteroids.indexOf(asteroid)
    this.asteroids.splice(ast_index,1)
    return this.asteroids
  }

})();
