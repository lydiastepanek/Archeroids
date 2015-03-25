(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
    this.ship = this.game.addShip();
  };

  GameView.prototype.start = function(){
    window.setInterval((function() {
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }).bind(this), 1000/60);
    this.bindKeyHandlers();
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
