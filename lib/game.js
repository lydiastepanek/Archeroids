(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

   var Game = Asteroids.Game = function (DIM_X, DIM_Y) {
    this.ships = [];
    this.asteroids = [];
    this.bullets = [];
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.asteroidPostns = [];
    this.addAsteroids();
    this.points = 0;
  };

  var NUM_ASTEROIDS = 15;
  asteroids = []

  Game.prototype.updatePoints = function () {
    $("#points").html(this.points)
  }

  Game.prototype.updateWinStatus = function () {
    if (this.asteroids.length === 0) {
      Asteroids.gameView.stop();
      $("#win-status").html("You won!");
      $("canvas").fadeTo( "slow" , 0.5)
      Asteroids.gameView = null;
      // $("#start-button").show()
      $("#start-button").prop("disabled",false)
    };
  }

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship(Asteroids.Util.randomPos(this.DIM_X),this);
    this.ships.push(ship);
    return ship;
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
    return bullet;
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var pos = Asteroids.Util.randomPos(this.DIM_X);
      this.asteroidPostns.push(pos);
      this.asteroids.push(new Asteroids.Asteroid(pos, this))
    }
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(Asteroids.img, 0, canvas.height - (canvas.width * (852 / 1280)), canvas.width, canvas.width * (852 / 1280));
    this.allObjects().forEach(function (el) {
      el.draw(ctx);
    })
  }

  Game.prototype.moveObjects = function (ctx) {
    this.allObjects().forEach(function (el) {
      el.move();
    })
  }

  Game.prototype.isOutOfBounds = function (pos) {
    return ((pos[0] < 0) || (pos[0] > this.DIM_X) || (pos[1] < 0) || (pos[1] > this.DIM_Y))
  }

  Game.prototype.wrap = function (pos, rad) {
    if (pos[0] + (rad / 2) < 0) {
      pos[0] = this.DIM_X;
    } else if (pos[0] + (rad / 2) > this.DIM_X) {
      pos[0] = 0;
    } else if (pos[1] + (rad / 2) < 0) {
      pos[1] = this.DIM_Y;
    } else if (pos[1] + (rad / 2) > this.DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  }

  Game.prototype.checkCollisions = function(){
    var objects = this.allObjects();
    var ship_explode = false;
    for(var i = 0; i<objects.length - 1; i++){
      for( var j = i + 1; j < objects.length; j++){
        if(objects[i].isCollidedWith(objects[j])){
          if ((objects[j] instanceof Asteroids.Ship) && (objects[i] instanceof Asteroids.Asteroid)) {
            ship_explode = true;
          }
          if ((objects[j] instanceof Asteroids.Bullet) && (objects[i] instanceof Asteroids.Asteroid)) {
            objects[j].collideWith(objects[i])
            this.points += 2;
          }
        };
      };
    };
    if (ship_explode) {
      this.ships[0].explode();
      this.points --;
    }
  }

  Game.prototype.step = function(ctx){
    this.moveObjects(ctx);
    this.checkCollisions();
  }

  Game.prototype.allObjects = function(){
    return this.asteroids.concat(this.bullets).concat(this.ships);
  }

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var ast_index = this.asteroids.indexOf(obj);
      this.asteroids.splice(ast_index,1);
    } else if (obj instanceof Asteroids.Ship) {
      var ship_index = this.ships.indexOf(obj);
      this.ships.splice(ship_index,1);
    } else if (obj instanceof Asteroids.Bullet) {
      var bullet_index = this.bullets.indexOf(obj);
      this.bullets.splice(bullet_index,1);
    }
  }

})();
