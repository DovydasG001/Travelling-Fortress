class EnemyTank{
	constructor(canvas,ctx, shootAnimation){
		this.canvas = canvas;
		this.ctx = ctx;
		this.sx = 0;
		this.i = 0;
		this.shootAnimation = shootAnimation;
		this.shoot = false;
		this.position = {
			x: 544,
			y: 203,
			x1: 994,
			y1: 636
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
		this.gunPosition = {
			x: this.position.x + 45,
			y: this.position.y + 240 ,
		};
		
		this.driverRoom = {
			hp: 3,
			x0: this.position.x + 220,
			y0: this.position.y + 303,
			x1: this.position.x + 380,
			y1: this.position.y + 420,
			collides: (x, y) => {
				return (x >= this.driverRoom.x0 && y>=this.driverRoom.y0 && x<=this.driverRoom.x1 && y<=this.driverRoom.y1);
			}
		};
		
		this.gunRoom = {
			hp: 3,
			x0: this.position.x + 215,
			y0: this.position.y + 190,
			x1: this.position.x + 280,
			y1: this.position.y + 300,
			collides: (x, y) => {
				return (x >= this.gunRoom.x0 && y>=this.gunRoom.y0 && x<=this.gunRoom.x1 && y<=this.gunRoom.y1);
			}
			
		};
		this.engineRoom = {
			hp: 3,
			x0: this.position.x + 216,
			y0: this.position.y + 140,
			x1: this.position.x + 235,
			y1: this.position.y + 100,
			x2: this.position.x + 260,
			y2: this.position.y + 50,
			x3: this.position.x + 415,
			y3: this.position.y + 300,
			collides: (x, y) => {
				return ((x >= this.engineRoom.x0 && y>=this.engineRoom.y0) || (x>=this.engineRoom.x1 && y>=this.engineRoom.y1) || (x>=this.engineRoom.x2 && y>=this.engineRoom.y2)) && x<=this.engineRoom.x3 && y<=this.engineRoom.y3;
			}
		};
		
	}

	drawTank(){
		if (this.shoot){
			if( this.i == 40){
				this.i = 0;
				this.sx = 0;
				this.shoot = false;
			}
			this.ctx.drawImage(this.shootAnimation, this.sx, 0, 450, 430, this.position.x, this.position.y, 450, 430);
			this.i++;
			if( this.i%4 == 0){
				this.sx += 450;
			}


		} else {
			this.ctx.drawImage(this.shootAnimation, 0, 0, 450, 430, this.position.x, this.position.y, 450, 430);
		}
	}

}
