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
    this.addAsteroids();
    this.points = 0;
  };

  var NUM_ASTEROIDS = 14;
  asteroids = []

  Game.prototype.updatePoints = function () {
    $("#points").html(this.points)
  }

  Game.prototype.updateWinStatus = function () {
    if (this.asteroids.length === 0) {
      Asteroids.gameView.stop();
      $("canvas").fadeTo( "fast" , 0.5)
      $("#win-status").html("You won!");
      var button = document.createElement("button");
      button.textContent = "Play Again";
      button.id = "play-again";
      $("#win-status").append(button);
      Asteroids.gameView = null;
      $("#start-button").prop("disabled",true)
    };
  }

  Game.prototype.relocateAsteroids = function () {
    var ctr = 0
    for (var asteroidIdx = 0; asteroidIdx < this.asteroids.length; asteroidIdx ++) {
      if (asteroidIdx % 2 === 0) {
        this.asteroids[asteroidIdx].pos = [0,5]
      } else {
        this.asteroids[asteroidIdx].pos = [Asteroids.width,5]
      }
    }
    // [1, 0]
    // [1, Asteroids.height]
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

      if (i % 2 === 0) {
        var pos = [0,5]
      } else {
        var pos = [Asteroids.width,5]
      }

      // var pos = Asteroids.Util.randomPos(this.DIM_X);
      this.asteroids.push(new Asteroids.Asteroid(pos, this))
    }
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    if ((canvas.width/canvas.height) > (1280 / 852)) {
      ctx.drawImage(Asteroids.img, 0, canvas.height - (canvas.width * (852 / 1280)), canvas.width, canvas.width * (852 / 1280));
    } else {
      ctx.drawImage(Asteroids.img, (canvas.width - canvas.height * (1280 / 852)) / 2, 0, canvas.height * (1280 / 852), canvas.height);
    }
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
    var wx = pos[0].mod(this.DIM_X);
    var wy = pos[1].mod(this.DIM_Y);
    return [wx, wy];
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
