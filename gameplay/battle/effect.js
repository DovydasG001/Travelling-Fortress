class Laser{
	constructor(canvas, ctx, startPointX, startPointY, angleWidth, shootAngle){
		this.canvas = canvas;
		this.ctx = ctx;
		this.startPointX = startPointX;
		this.startPointY = startPointY;
		this.angleWidth = angleWidth;
		this.shootAngle = shootAngle;
		this.length = 50;
		this.randomAngle = Math.random() * (angleWidth - 1) + 1;
		this.cos = Math.cos(Math.PI * (((this.randomAngle - angleWidth / 2) + this.shootAngle) / 180.0));
		this.sin = Math.sin(Math.PI * (((this.randomAngle - angleWidth / 2) + this.shootAngle) / 180.0));
		this.lineEnd = {
			x: this.startPointX + this.length * this.cos,
			y: this.startPointY + this.length * this.sin
		};
		this.lineStart = {
			x: this.startPointX,
			y: this.startPointY
		};
	}
	
	drawLaser(){
		this.ctx.clearRect(this.lineStart.x -2, this.lineStart.y -2, 4, 4);
		this.ctx.beginPath();
		this.ctx.moveTo(this.lineStart.x, this.lineStart.y);
		this.ctx.lineTo(this.lineEnd.x, this.lineEnd.y);
		this.ctx.closePath();
		this.lineStart.x += this.cos * 10;
		this.lineStart.y += this.sin * 10;
		this.lineEnd.x += this.cos * 10;
		this.lineEnd.y += this.sin * 10;
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#666666';
		this.ctx.stroke();
	}
}

class Explosion{
	constructor(canvas, ctx, explosion, x, y){
		this.canvas = canvas;
		this.ctx = ctx;
		this.explosion = explosion;
		this.x = x;
		this.y = y;
		this.sx = 0;
		this.i = 0;
	}
	
	drawExplosion() {
		console.log(this.x);
		console.log(this.y);
		console.log(this.sx);
		this.ctx.drawImage(this.explosion, this.sx, 0, 26, 26, this.x, this.y, 26, 26);
		this.i++;
		if( this.i%4 == 0){
			this.sx += 26;
		}
	}
}


