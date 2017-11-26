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
    // this.ctx.fillText("W:", this.powerbarPosition.x, this.powerbarPosition.y);
		// this.ctx.fillText("E:", this.powerbarPosition.x+62, this.powerbarPosition.y);
    // this.ctx.fillText("D:", this.powerbarPosition.x+120, this.powerbarPosition.y);

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
    // this.ctx.fillStyle = 'gray';
    // this.ctx.fillRect(this.powerbarPosition.x + 40, this.powerbarPosition.y - 25, 20, 30);
    // this.ctx.fillRect(this.powerbarPosition.x + 40 + 60, this.powerbarPosition.y - 25, 20, 30);
    // this.ctx.fillRect(this.powerbarPosition.x + 40 + 120, this.powerbarPosition.y - 25, 20, 30);

    this.ctx.strokeStyle = 'blue';
    if (this.poweredRoom == 'W') {
      // this.ctx.fillStyle = 'blue';
      // this.ctx.fillRect(this.powerbarPosition.x + 40, this.powerbarPosition.y - 25, 20, 30);
      this.ctx.beginPath();
      this.ctx.arc(this.powerbarPosition.x+36, this.powerbarPosition.y -14, 24, 0, 90 * Math.PI/180);
      this.ctx.stroke();
    } else if(this.poweredRoom == 'E') {
      // this.ctx.fillStyle = 'blue';
      // this.ctx.fillRect(this.powerbarPosition.x + 40 + 60, this.powerbarPosition.y - 25, 20, 30);
      this.ctx.beginPath();
      this.ctx.arc(this.powerbarPosition.x+36+61, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
      this.ctx.stroke();
    } else if(this.poweredRoom == 'D') {
      // this.ctx.fillStyle = 'blue';
      // this.ctx.fillRect(this.powerbarPosition.x + 40 + 120, this.powerbarPosition.y - 25, 20, 30);
      this.ctx.beginPath();
      this.ctx.arc(this.powerbarPosition.x+36+120, this.powerbarPosition.y -14, 24, 0, 2 * Math.PI);
      this.ctx.stroke();
    }

  }
}
