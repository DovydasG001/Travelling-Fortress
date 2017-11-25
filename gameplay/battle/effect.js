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
		this.cos = Math.cos(Math.PI * (((randomAngle - angleWidth / 2) + shootAngle) / 180.0));
		this.sin = Math.sin(Math.PI * (((randomAngle - angleWidth / 2) + shootAngle) / 180.0));
		this.lineEnd = {
			x: startPointX + length * cos,
			y: startPointY + length * sin
		};
		this.lineStart = {
			x: startPointX,
			y: startPointY
		};
	}
	
	drawLaser(){
		this.ctx.clearRect(this.lineStart.x -2, this.lineStart.y -2, 4, 4);
		this.ctx.beginPath();
		this.ctx.moveTo(this.lineStart.x, this.lineStart.y);
		this.ctx.lineTo(this.lineEnd.x, this.lineEnd.y);
		this.ctx.closePath();
		this.lineStart.x += this.cos;
		this.lineStart.y += this.sin;
		this.lineEnd.x += this.cos;
		this.lineEnd.y += this.sin;
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#666666';
		this.ctx.stroke();
		/**
			if(lineStart.x > 1024 || lineStart.y > 768){
				DELETE OBJECT
			}
		*/
	}
}


