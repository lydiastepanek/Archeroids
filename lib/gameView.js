(function () {
  if (typeof Asteroids === "undefined") {
   window.Asteroids = {};
  }

  Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx.getContext("2d");
    // ctx.clearRect(0, 0, this.xDim, this.yDim);
  };

  Asteroids.GameView.prototype.start = function(){
    window.setInterval((function() {
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }).bind(this), 1000/60);
  };

})();
