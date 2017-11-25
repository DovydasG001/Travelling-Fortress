class MainTank{
	constructor(canvas,ctx){
		this.canvas = canvas;
		this.ctx = ctx;
		this.sx = 0;
		this.i = 0;
		this.shootAnimation = new Image(5121, 658);
		this.shootAnimation.src = '../../graphics/shootAnimation(fixedRez).png';
		this.shootAnimation.onload = function(){
			ctx.drawImage(shootAnimation, 0, 0, 569, 658, 0, 150, 569, 658);
		}
	}
	
	shootCannon(){
		shootLaser(400, 175, 90, 0);
		if( this.i == 8){
			this.i = 0;
			this.sx = 0;
		}
		this.ctx.drawImage(this.shootAnimation, this.sx, 0, 569, 658, 0, 150, 569, 658);
		this.sx += 569;
		this.i++;
	}
	
}