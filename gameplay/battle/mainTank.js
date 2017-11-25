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
				rotation: 40,
				angle: 25,
				cooldown: 1.25,
			}
		},
		this.currentTarget = 'config1';
		this.engineRoom = {
			hp: 3,
			powered: true,
			x0: (this.position.x + 60) * this.resizeRatio,
			y0: (this.position.y + 110) * this.resizeRatio,
			x1: (this.position.x + 375) * this.resizeRatio,
			y1: (this.position.y + 495) * this.resizeRatio,
			collides: (x, y) => {
				return x >= this.engineRoom.x0 && y>=this.engineRoom.y0 && x<=this.engineRoom.x1 && y<=this.engineRoom.y1;
			}
		};
		this.driverRoom = {
			hp: 3,
			powered: false,
			x0: (this.position.x + 10) * this.resizeRatio,
			y0: (this.position.y + 485) * this.resizeRatio,
			x1: (this.position.x + 430) * this.resizeRatio,
			y1: (this.position.y + 635) * this.resizeRatio,
			collides: (x, y) => {
				return (x >= this.driverRoom.x0 && y>=this.driverRoom.y0 && x<=this.driverRoom.x1 && y<=this.driverRoom.y1);
			}
		};
		
		this.gunRoom = {
			hp: 3,
			x0: (this.position.x + 220) * this.resizeRatio,
			y0: (this.position.y + 88) * this.resizeRatio,
			x1: (this.position.x + 380) * this.resizeRatio,
			y1: (this.position.y + 330) * this.resizeRatio,
			collides: (x, y) => {
				return (x >= this.gunRoom.x0 && y>=this.gunRoom.y0 && x<=this.gunRoom.x1 && y<=this.gunRoom.y1);
			}
			
		};
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
