class PowerBar {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
		this.poweredRoom = 'E';
    this.powerbarPosition = {
      x: 20,
      y: 740
    }
  }

  // Set powered room
  setPoweredRoom(roomName) {
    this.poweredRoom = roomName;
  }

  drawPowerBar() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("W:", this.powerbarPosition.x, this.powerbarPosition.y);
		this.ctx.fillText("E:", this.powerbarPosition.x+62, this.powerbarPosition.y);
    this.ctx.fillText("D:", this.powerbarPosition.x+120, this.powerbarPosition.y);

    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(this.powerbarPosition.x + 40, this.powerbarPosition.y - 25, 20, 30);
    this.ctx.fillRect(this.powerbarPosition.x + 40 + 60, this.powerbarPosition.y - 25, 20, 30);
    this.ctx.fillRect(this.powerbarPosition.x + 40 + 120, this.powerbarPosition.y - 25, 20, 30);

    if (this.poweredRoom == 'W') {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.powerbarPosition.x + 40, this.powerbarPosition.y - 25, 20, 30);
    } else if(this.poweredRoom == 'E') {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.powerbarPosition.x + 40 + 60, this.powerbarPosition.y - 25, 20, 30);
    } else if(this.poweredRoom == 'D') {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(this.powerbarPosition.x + 40 + 120, this.powerbarPosition.y - 25, 20, 30);
    }

  }
}
