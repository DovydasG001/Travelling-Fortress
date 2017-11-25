var hpGUI = document.getElementById("hpGUI");
var hpGUICtx = hpGUI.getContext("2d");
var hitCount = 0;
var hp = 10;
var enemyHitCount = 0;
var enemyHp = 10;
var hpX= 75;

hpGUICtx.font = "30px Arial";
hpGUICtx.fillText("HP:", 10, 45);
hpGUICtx.fillText("Enemy HP:", 600, 45);

var drawBar = function (x){
	hpGUICtx.beginPath();
	hpGUICtx.lineWidth="3";
	hpGUICtx.strokeStyle="black";
	hpGUICtx.rect(x, 22, 10, 25);
	hpGUICtx.fillStyle = "red";
	hpGUICtx.fill();
	hpGUICtx.stroke();
	hpGUICtx.closePath();
}

var refreshHp = function(){
	hpGUICtx.clearRect(75, 10, 230, 45);
	hpGUICtx.clearRect(760, 10, 230, 45);
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


