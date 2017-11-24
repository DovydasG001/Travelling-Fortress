var canvas = document.getElementById("hpGUI");
var ctx = canvas.getContext("2d");
var hitCount = 0;
var hp = 10;
var enemyHitCount = 0;
var enemyHp = 10;
var hpX= 75;

ctx.font = "30px Arial";
ctx.fillText("HP:", 10, 45);
ctx.fillText("Enemy HP:", 600, 45);

var drawBar = function (x){
	ctx.beginPath();
	ctx.lineWidth="3";
	ctx.strokeStyle="black";
	ctx.rect(x, 22, 10, 25);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

var refreshHp = function(){
	ctx.clearRect(75, 10, 230, 45);
	ctx.clearRect(760, 10, 230, 45);
	hpX= 75;
	for (i=0; i <= hp - hitCount; i++){
		drawBar(hpX);
		hpX += 15;
	}

	hpX = 760;
	for (i=0; i <= enemyHp - enemyHitCount; i++){
		drawBar(hpX);
		hpX += 15;
	}
}


