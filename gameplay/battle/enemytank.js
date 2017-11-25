class EnemyTank{
	constructor(canvas,ctx, shootAnimation){
		this.canvas = canvas;
		this.ctx = ctx;
		this.sx = 0;
		this.i = 0;
		this.shootAnimation = shootAnimation;
		this.shoot = false;
		this.position = {
			x: 614,
			y: 220,
			x1: 994,
			y1: 636
		};
		this.gunPosition = {
			x: this.position.x - (this.position.x1 - this.position.x) * 25 / 380,
			y: this.position.y + (this.position.y1 - this.position.y) * 225 / 416,
		};
	}

	drawTank(){
		if (this.shoot){
			if( this.i == 32){
				this.i = 0;
				this.sx = 0;
				this.shoot = false;
			}
			this.ctx.drawImage(this.shootAnimation, this.sx, 0, 380, 416, this.position.x, this.position.y, 380, 416);
			this.i++;
			if( this.i%4 == 0){
				this.sx += 380;
			}


		} else {
			this.ctx.drawImage(this.shootAnimation, 0, 0, 380, 416, this.position.x, this.position.y, 380, 416);
		}
	}

}
