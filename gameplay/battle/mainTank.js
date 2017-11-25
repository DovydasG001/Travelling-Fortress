class MainTank{
	constructor(canvas,ctx, shootAnimation){
		this.canvas = canvas;
		this.ctx = ctx;
		this.sx = 0;
		this.i = 0;
		this.shootAnimation = shootAnimation;
		this.shoot = false;
		this.resizeRatio = 0.75;
		this.position = {
			x: 0,
			y: 150,
			x1: 569 * this.resizeRatio,
			y1: 708 * this.resizeRatio
		};
		this.gunPosition = {
			x: this.position.x + (this.position.x1 - this.position.x) * 528 / 569,
			y: this.position.y + 25 + (this.position.y1 - this.position.y) * 155 / 658,
		};
		this.target = {
			config1: {
				rotation: 10,
				angle: 45,
				cooldown: 1,
			},
			config2: {
				rotation: 15,
				angle: 90,
				cooldown: 1.5,
			},
			config3: {
				rotation: 45,
				angle: 25,
				cooldown: 1.25,
			}
		},
		this.currentTarget = 'config1';
	}

	drawTank(){
		if (this.shoot){
			if( this.i == 32){
				this.i = 0;
				this.sx = 0;
				this.shoot = false;
			}
			this.ctx.drawImage(this.shootAnimation, this.sx, 0, 569, 658, this.position.x, this.position.y, 569 * this.resizeRatio, 658 * this.resizeRatio);
			this.i++;
			if( this.i%4 == 0){
				this.sx += 569;
			}


		} else {
			this.ctx.drawImage(this.shootAnimation, 0, 0, 569, 658, this.position.x, this.position.y, 569 * this.resizeRatio, 658 * this.resizeRatio);
		}
	}

}
