class wpGUI {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isWeaponActive = false;
    this.loadingBar = 0;
    this.loadSpeed = 0.01;
    this.weaponsPosition = {
      x0: 237,
      y0: 708,
      x1: 337,
      y1: 768
    };
  }

  // Sets the speed of reloading
  setLoadSpeed(setting) {
    if (setting == 'powered') {
      this.loadSpeed = 0.02;
    } else if (setting == 'unpowered') {
      this.loadSpeed = 0.01;
    }
  }

  loadWeapon() {
    this.loadingBar += this.loadSpeed;
  }

  depleteWeapon() {
    this.loadingBar = 0;
  }

  drawWeapon() {
    if (this.isWeaponActive) {
      this.setActive();
    } else {
      this.setInactive();
    }
  }

  setInactive() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.weaponsPosition.x0, this.weaponsPosition.y0, 120, 60);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(this.weaponsPosition.x0, this.weaponsPosition.y0 + 60 - (this.loadingBar*60), 120, (this.loadingBar*60));
  }

  setActive() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.weaponsPosition.x0, this.weaponsPosition.y0, 120, 60);
  }
}
