class PowerBar {
  constructor(canvas, ctx, engineImg, weaponImg, driverImg) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.engineImg = engineImg;
    this.weaponImg = weaponImg;
    this.driverImg = driverImg;
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
    this.ctx.drawImage(this.weaponImg, this.powerbarPosition.x, 690, 70, 70);
    this.ctx.drawImage(this.engineImg, this.powerbarPosition.x+62, 690, 70, 70);
    this.ctx.drawImage(this.engineImg, this.powerbarPosition.x+120, 690, 70, 70);

    this.ctx.strokeStyle = 'gray';
    this.ctx.beginPath();
    this.ctx.arc(this.powerbarPosition.x+36, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.powerbarPosition.x+36+61, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.powerbarPosition.x+36+120, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.strokeStyle = 'blue';
    if (this.poweredRoom == 'W') {
      this.ctx.beginPath();
      this.ctx.arc(this.powerbarPosition.x+36, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
      this.ctx.stroke();
    } else if(this.poweredRoom == 'E') {
      this.ctx.beginPath();
      this.ctx.arc(this.powerbarPosition.x+36+61, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
      this.ctx.stroke();
    } else if(this.poweredRoom == 'D') {
      this.ctx.beginPath();
      this.ctx.arc(this.powerbarPosition.x+36+120, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
      this.ctx.stroke();
    }

  }
}
