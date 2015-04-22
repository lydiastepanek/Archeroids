(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, DIM_X, DIM_Y) {
    this.game = new Asteroids.Game(DIM_X, DIM_Y);
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.bindKeyHandlers();
  };

  GameView.prototype.start = function(){
    Asteroids.interval = window.setInterval((function() {
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
      this.game.updatePoints();
      this.game.updateWinStatus();
    }).bind(this), 1000/30); //60
  };

  GameView.prototype.stop = function(){
    clearInterval(Asteroids.interval);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    key("up", function () { ship.power() });
    key("down", function () { ship.power(true) });
    key("left", function () {
      // ship.power([-1,  0]);
      ship.rotateLeft();
    });
    key("right", function () {
      // ship.power([ 1,  0]);
      ship.rotateRight();
    });

    key("space", function () { ship.fireBullet() });
  };

})();
