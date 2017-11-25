class hpGUI {
	constructor(canvas, ctx) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.hitCount = 0;
		this.hp = 10;
		this.enemyHitCount = 0;
		this.enemyHp = 10;
		this.hpX= 75;
		this.ctx.font = "30px Arial";
	}

	drawBar(x) {
		this.ctx.fillText("HP:", 10, 45);
		this.ctx.fillText("Enemy HP:", 600, 45);
		this.ctx.beginPath();
		this.ctx.lineWidth="3";
		this.ctx.strokeStyle="black";
		this.ctx.rect(x, 22, 10, 25);
		this.ctx.fillStyle = "red";
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

	refreshHp() {
		if(this.enemyHp == this.enemyHitCount){
			window.location.href='../menu/menu.html'
		}
		this.hpX = 75;
		for (var i=0; i <= this.hp - this.hitCount; i++){
			this.drawBar(this.hpX);
			this.hpX += 15;
		}

		this.hpX = 760;
		for (i=0; i <= this.enemyHp - this.enemyHitCount; i++){
			this.drawBar(this.hpX);
			this.hpX += 15;
		}
	}

}
