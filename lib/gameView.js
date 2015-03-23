(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
    this.ship = this.game.addShip();
    // ctx.clearRect(0, 0, this.xDim, this.yDim);
  };

  GameView.prototype.start = function(){
    window.setInterval((function() {
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }).bind(this), 1000/60);
    this.bindKeyHandlers();
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    // key("space", function () { ship.fireBullet() });
  };

})();
