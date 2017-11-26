class wpGUI {
  constructor(canvas, ctx, weaponLoadImg) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.weaponLoadImg = weaponLoadImg;
    this.isWeaponActive = false;
    this.loadingBar = 0;
    this.loadSpeed = 0.01;
    this.weaponsPosition = {
      x0: 237,
      y0: 698,
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
    this.ctx.drawImage(this.weaponLoadImg, this.weaponsPosition.x0-25, this.weaponsPosition.y0-10, 71*2.5, 33*2.5);
    if (this.isWeaponActive) {
      this.setActive();
    } else {
      this.setInactive();
    }
  }

  setInactive() {
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(this.weaponsPosition.x0+10 , this.weaponsPosition.y0+12 , (this.loadingBar*70), 34);
  }

  setActive() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.weaponsPosition.x0+10 , this.weaponsPosition.y0+12 , (this.loadingBar*70), 34);
  }
}
