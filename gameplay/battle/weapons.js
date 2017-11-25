class wpGUI {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isWeaponActive = false;
    this.weaponsPosition = {
      x0: 237,
      y0: 708,
      x1: 337,
      y1: 768
    };
  }

  drawWeapon() {

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
  }

  setActive() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.weaponsPosition.x0, this.weaponsPosition.y0, 120, 60);
  }
}
