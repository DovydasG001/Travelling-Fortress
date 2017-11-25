var isOnWeapons = false;
var isOnEnemy = false;
var weaponsSelected = false;

var weaponsPosition = {
  x0: 237,
  y0: 708,
  x1: 337,
  y1: 768
};

var enemyPosition = {
  x0: 614,
  y0: 150,
  x1: 994,
  y1: 750
};

function checkMousePosition(mousePosition, mainTank, enemyTank) {
  if ((mousePosition.x >= weaponsPosition.x0 && mousePosition.x <= weaponsPosition.x1) && (mousePosition.y >= weaponsPosition.y0 && mousePosition.y <= weaponsPosition.y1)) {
    return "weapons";
  } else if (enemyTank.driverRoom.collides(mousePosition.x, mousePosition.y)){
	mainTank.currentTarget = "config3"
	return "driverRoom";
  } else if (enemyTank.gunRoom.collides(mousePosition.x, mousePosition.y)){
	  mainTank.currentTarget = "config2"
	return "gunRoom";
  } else if (enemyTank.engineRoom.collides(mousePosition.x, mousePosition.y)){
	  mainTank.currentTarget = "config1"
	return "engineRoom"
  }
}

function mouseMoveEvent(event, canvas, mainTank, enemyTank) {
  // Get mouse position
  mousePosition = {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY- canvas.offsetTop
  };

  var x0 = 237, y0 = 708, x1 = 337, y1 = 768;
  console.log(document);
  mouseIsOn = checkMousePosition(mousePosition, mainTank, enemyTank);
  console.log(mouseIsOn);
  if (mouseIsOn == "weapons") {
    isOnWeapons = true;
  } else if (mouseIsOn == "driverRoom" || mouseIsOn == "engineRoom" || mouseIsOn == "gunRoom") {
    isOnEnemy = true;
  } else {
    isOnWeapons = false;
    isOnEnemy = false;
  }
}

function addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers, enemyTank) {
  canvas.addEventListener(
    'mousemove',
    (event) => {
      mouseMoveEvent(event, canvas, mainTank, enemyTank);
    }
  );

  canvas.addEventListener(
    'click',
    (event) => {
		console.log(isOnEnemy);
		console.log(weaponsSelected);
      if (isOnWeapons && !weaponsSelected && weaponsGUI.loadingBar > 0.98) {
        weaponsSelected = true;
        weaponsGUI.isWeaponActive = true;
      } else if (isOnWeapons && weaponsSelected) {
        weaponsSelected = false;
        weaponsGUI.isWeaponActive = false;
      } else if (isOnEnemy && weaponsSelected) {
        // Call enemy attack functionfunction()
		
        lasers.push(new Laser(canvas, ctx, mainTank.gunPosition.x, mainTank.gunPosition.y, mainTank.target[mainTank.currentTarget].angle, mainTank.target[mainTank.currentTarget].rotation));
		    mainTank.shoot = true;
		    cannonSound.play();
        weaponsSelected = false;
        weaponsGUI.isWeaponActive = false;
        weaponsGUI.depleteWeapon();
      }

    }
  );
}

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  var hitpointsGUI = new hpGUI(canvas, ctx);
  var weaponsGUI = new wpGUI(canvas, ctx);
  var mainTank;
  var enemyTank;
  var shootAnimation = new Image(5121, 658);
	shootAnimation.src = '../../graphics/shootAnimation(fixedRez).png';
  var explosionAnimation = new Image(234, 26);
  explosionAnimation.src = '../../graphics/explosion.png';
  var enemyTankSheet = new Image(270, 148);
  enemyTankSheet.src = '../../graphics/enemyTank1.png';
  var crosshair = new Image(300, 300);
  crosshair.src = '../../graphics/crosshair.gif';
  var explosions = [];
  var lasers = [];
  var imagesLoaded = 0;
  var imageQuantity = 4;
  shootAnimation.onload = () => {
		imagesLoaded++;
		mainTank = new MainTank(canvas, ctx, shootAnimation);
		if (imagesLoaded == imageQuantity){
			startGame();
		}
  }
  enemyTankSheet.onload = () => {
		imagesLoaded++;
		enemyTank = new EnemyTank(canvas, ctx, enemyTankSheet);
		if (imagesLoaded == imageQuantity){
			startGame();
		}
  }
  explosionAnimation.onload = () => {
	imagesLoaded++;
	if (imagesLoaded == imageQuantity){
		startGame();
	}
  }
  crosshair.onload = () => {
	imagesLoaded++;
	if (imagesLoaded == imageQuantity){
		startGame();
	}
  }
  
	var startGame = () => {
		addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers, enemyTank);
		var enemyShootFrames = 0;
		window.setInterval(() => {
		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// draw tank
		mainTank.drawTank();

		// draw enemy tank
		enemyTank.drawTank();
		// draw hp
		hitpointsGUI.refreshHp();

		// draw weapons
		weaponsGUI.drawWeapon();
		if (weaponsGUI.loadingBar < 1) {
		  weaponsGUI.loadWeapon();
		  console.log("loading bar: " + weaponsGUI.loadingBar);
		}
		//draw target
		
		switch(mouseIsOn){
			case "engineRoom":
				ctx.drawImage(crosshair, enemyTank.position.x + 245, enemyTank.position.y + 165, 100, 100);
				break;
			case "driverRoom":
				ctx.drawImage(crosshair, enemyTank.driverRoom.x0+35, enemyTank.driverRoom.y0-25, 100, 100);
				break;
			case "gunRoom":
				ctx.drawImage(crosshair, enemyTank.gunRoom.x0 - 25, enemyTank.gunRoom.y0, 100, 100);
				break;
			default:
			
		}
		
		//enemy shoot
		
		if(enemyShootFrames >=110){
			enemyShootFrames = 0;
			lasers.push(new Laser(canvas, ctx, enemyTank.gunPosition.x + 50, enemyTank.gunPosition.y, 100, 180));
		}
		//draw lasers
		for(var i in lasers){
			lasers[i].drawLaser();
			if(lasers[i].lineStart.x > 1024 || lasers[i].lineStart.y > 768 || lasers[i].lineStart.x < 0 || lasers[i].lineStart.y < 0){
				lasers.splice(i, 1);
			}
			else if(lasers[i].checkIfCollidesWithEnemy(enemyPosition)){
				hitpointsGUI.enemyHitCount++;
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			} else if(lasers[i].checkIfCollidesWithPlayer(mainTank.position)){
				hitpointsGUI.hitCount++;
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			}
		}
		//draw exsplosions
		for(var i in explosions){
			explosions[i].drawExplosion();
			if (explosions[i].i >= 36){
				explosions.splice(i, 1);
			}
		}
		
		enemyShootFrames++;

	  }, 1000 / 60);
	}
	  
};
