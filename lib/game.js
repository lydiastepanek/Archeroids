(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

   var Game = Asteroids.Game = function () {
    this.ships = [];
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.points = 0;
  };

  var DIM_X = 500;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 1;
  asteroids = []

  Game.prototype.updatePoints = function () {
    $("#points").html(this.points)
  }

  Game.prototype.updateWinStatus = function () {
    if (this.asteroids.length === 0) {
      gameView.stop();
      $("#win-status").html("You won!");
      $("section").css('background','#fff')
      // this.ships[0].radius = this.radius * 2;
      // this.ships[0].color = "black";
      // this.ships[0].draw(Asteroids.ctx);
      // var pos = this.ships[0].pos
    };
  }

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship(Asteroids.Util.randomPos(500),this);
    this.ships.push(ship);
    return ship;
  };

  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
    return bullet;
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var pos = Asteroids.Util.randomPos(500);
      this.asteroids.push(new Asteroids.Asteroid(pos, this))
    }
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    // ctx.drawImage(img, 10, 10)
    this.allObjects().forEach(function (el) {
      el.draw(ctx);
    })
  }

  Game.prototype.moveObjects = function (ctx) {
    this.allObjects().forEach(function (el) {
      el.move();
    })
  }

  Game.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[0] > DIM_X) || (pos[1] < 0) || (pos[1] > DIM_Y)
  }

  Game.wrap = function (pos, rad) {
    if (pos[0] + (rad / 2) < 0) {
      pos[0] = DIM_X;
    } else if (pos[0] + (rad / 2) > DIM_X) {
      pos[0] = 0;
    }
    if (pos[1] + (rad / 2) < 0) {
      pos[1] = DIM_Y;
    } else if (pos[1] + (rad / 2) > DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  }

  Game.prototype.checkCollisions = function(){
    var objects = this.allObjects();
    for(var i = 0; i<objects.length - 1; i++){
      for( var j = i + 1; j < objects.length; j++){
        if(objects[i].isCollidedWith(objects[j])){
          if ((objects[j] instanceof Asteroids.Ship) && (objects[i] instanceof Asteroids.Asteroid)) {
            this.ships[0].explode();
            this.points --;
            // this.ships[0].relocate();
          }
          if (objects[j] instanceof Asteroids.Bullet) {
            objects[j].collideWith(objects[i])
            this.points += 2;
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
