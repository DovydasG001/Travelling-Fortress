class MainTank{
	constructor(canvas,ctx, shootAnimation){
		this.canvas = canvas;
		this.ctx = ctx;
		this.sx = 0;
		this.i = 0;
		this.shootAnimation = shootAnimation;
		this.shoot = false;
	}
	
	drawTank(){
		if (this.shoot){
			if( this.i == 32){
				this.i = 0;
				this.sx = 0;
				this.shoot = false;
			}
			this.ctx.drawImage(this.shootAnimation, this.sx, 0, 569, 658, 0, 150, 569, 658);
			this.i++;
			if( this.i%4 == 0){
				this.sx += 569;
			}
			
			
		} else {
			this.ctx.drawImage(this.shootAnimation, 0, 0, 569, 658, 0, 150, 569, 658);
		}
	}
	
}