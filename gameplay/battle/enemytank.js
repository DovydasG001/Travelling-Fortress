class EnemyTank {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.enemyPosition = {
      x: 614,
      y: 150
    };
  }

  drawTank() {
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(this.enemyPosition.x, this.enemyPosition.y, 380, 600);
  }
}
