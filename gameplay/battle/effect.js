var effectCanvas = document.getElementById("effectCanvas");
var effectCtx = effectCanvas.getContext("2d");

var shootLaser = function (startPointX, startPointY, angleWidth, shootAngle){
	var length = 50
	var randomAngle = Math.random() * (angleWidth - 1) + 1;
	var cos = Math.cos(Math.PI * (((randomAngle - angleWidth / 2) + shootAngle) / 180.0));
	var sin = Math.sin(Math.PI * (((randomAngle - angleWidth / 2) + shootAngle) / 180.0));
	var lineEnd = {
		x: startPointX + length * cos,
		y: startPointY + length * sin
	};
	var lineStart = {
		x: startPointX,
		y: startPointY
	};
	
	var interval = setInterval(function(){ 
		effectCtx.clearRect(lineStart.x -2, lineStart.y -2, 4, 4);
		effectCtx.beginPath();
		effectCtx.moveTo(lineStart.x, lineStart.y);
		effectCtx.lineTo(lineEnd.x, lineEnd.y);
		effectCtx.closePath();
		lineStart.x += cos;
		lineStart.y += sin;
		lineEnd.x += cos;
		lineEnd.y += sin;
		effectCtx.lineWidth = 2;
		effectCtx.strokeStyle = '#666666';
		effectCtx.stroke();
		if(lineStart.x > 1024 || lineStart.y > 768){
			clearInterval(interval);
		}
	}, 1);

	
}


