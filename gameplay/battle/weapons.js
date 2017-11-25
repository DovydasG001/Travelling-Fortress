class wpGUI {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isWeaponActive = false;
    this.loadingBar = 0;
    this.weaponsPosition = {
      x0: 237,
      y0: 708,
      x1: 337,
      y1: 768
    };
  }

  loadWeapon() {
    this.loadingBar += 0.01;
  }

  depleteWeapon() {
    this.loadingBar = 0;
  }

  drawWeapon() {
    if (this.loadingBar > 0.98) {
      this.isWeaponActive = true;
    }
    if (this.isWeaponActive) {
      this.setActive();
      console.log("Sets active");
    } else {
      this.setInactive();
      console.log("Sets Inactive");
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
