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
		
		this.driverRoom = {
			x0: this.position.x + 148,
			y0: this.position.y + 285,
			x1: this.position.x + 310,
			y1: this.position.y + 400,
			collides: (x, y) => {
				return (x >= this.driverRoom.x0 && y>=this.driverRoom.y0 && x<=this.driverRoom.x1 && y<=this.driverRoom.y1);
			}
		};
		
		this.gunRoom = {
			x0: this.position.x + 150,
			y0: this.position.y + 175,
			x1: this.position.x + 205,
			y1: this.position.y + 280,
			collides: (x, y) => {
				return (x >= this.gunRoom.x0 && y>=this.gunRoom.y0 && x<=this.gunRoom.x1 && y<=this.gunRoom.y1);
			}
			
		};
		this.engineRoom = {
			x0: this.position.x + 190,
			y0: this.position.y + 40,
			x1: this.position.x + 171,
			y1: this.position.y + 90,
			x2: this.position.x + 150,
			y2: this.position.y + 180,
			x3: this.position.x + 346,
			y3: this.position.y + 285,
			collides: (x, y) => {
				return ((x >= this.engineRoom.x0 && y>=this.engineRoom.y0) || (x>=this.engineRoom.x1 && y>=this.engineRoom.y1) || (x>=this.engineRoom.x2 && y>=this.engineRoom.y2)) && x<=this.engineRoom.x3 && y<=this.engineRoom.y3;
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
