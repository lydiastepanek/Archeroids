(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
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
    }).bind(this), 1000/10); //60
  };

  GameView.prototype.stop = function(){
    clearInterval(Asteroids.interval);
  };

  GameView.MOVES = {
    "up": [ 0, -1],
    "left": [-1,  0],
    "down": [ 0,  1],
    "right": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });
  };

})();
