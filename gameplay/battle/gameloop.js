var isOnWeapons = false;
var isOnEnemy = false;
var isOnW = false;
var isOnE = false;
var isOnD = false;
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

var weaponBarW = {
  x0: 18,
  y0: 717,
  x1: 80,
  y1: 744
};

var weaponBarE = {
  x0: 85,
  y0: 718,
  x1: 141,
  y1: 744
};

var weaponBarD = {
  x0: 143,
  y0: 718,
  x1: 202,
  y1: 744
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
  } else if((mousePosition.x >= weaponBarW.x0 && mousePosition.x <= weaponBarW.x1) && (mousePosition.y >= weaponBarW.y0 && mousePosition.y <= weaponBarW.y1)) {
    return "W";
  } else if ((mousePosition.x >= weaponBarE.x0 && mousePosition.x <= weaponBarE.x1) && (mousePosition.y >= weaponBarE.y0 && mousePosition.y <= weaponBarE.y1)) {
    return "E";
  } else if ((mousePosition.x >= weaponBarD.x0 && mousePosition.x <= weaponBarD.x1) && (mousePosition.y >= weaponBarD.y0 && mousePosition.y <= weaponBarD.y1)) {
    return "D";
  }
}

function mouseMoveEvent(event, canvas, mainTank, enemyTank) {
  // Get mouse position
  mousePosition = {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY- canvas.offsetTop
  };

  mouseIsOn = checkMousePosition(mousePosition, mainTank, enemyTank);

  switch (mouseIsOn){
	case "weapons":
		isOnWeapons = true;
		break;
	case "driverRoom":
	case "engineRoom":
	case "gunRoom":
		isOnEnemy = true;
		break;
	case "W":
		isOnW = true;
		break;
	case "E":
		isOnE = true;
		break;
	case "D":
		isOnD = true;
		break;
	default:
		isOnWeapons = false;
		isOnEnemy = false;
		isOnW = false;
		isOnE = false;
		isOnD = false;
  }
}

function addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers, enemyTank, powerBar) {
  canvas.addEventListener(
    'mousemove',
    (event) => {
      mouseMoveEvent(event, canvas, mainTank, enemyTank);
    }
  );

  canvas.addEventListener(
    'click',
    (event) => {
      if (isOnWeapons && !weaponsSelected && weaponsGUI.loadingBar > 0.98) {
        weaponsSelected = true;
        weaponsGUI.isWeaponActive = true;
      } else if (isOnWeapons && weaponsSelected) {
        weaponsSelected = false;
        weaponsGUI.isWeaponActive = false;
      } else if (isOnEnemy && weaponsSelected && mainTank.gunRoom.hp > 0) {
        // Call enemy attack functionfunction()
        lasers.push(new Laser(canvas, ctx, mainTank.gunPosition.x, mainTank.gunPosition.y, mainTank.target[mainTank.currentTarget].angle, mainTank.target[mainTank.currentTarget].rotation));
		    mainTank.shoot = true;
			var cannonSound = new Audio('../../music/Cannon+3.mp3')
		    cannonSound.play();
        weaponsSelected = false;
        weaponsGUI.isWeaponActive = false;
        weaponsGUI.depleteWeapon();
      } else if (isOnW) {
        powerBar.setPoweredRoom("W");
        // change loading speed
        weaponsGUI.setLoadSpeed('powered');
		mainTank.engineRoom.powered = false;
		poweredFrames = 0;
      } else if (isOnE) {
        powerBar.setPoweredRoom("E");
        weaponsGUI.setLoadSpeed('unpowered');
		mainTank.engineRoom.powered = true;
		poweredFrames = 0;
      } else if (isOnD) {
        powerBar.setPoweredRoom("D");
        weaponsGUI.setLoadSpeed('unpowered');
		mainTank.engineRoom.powered = false;
		poweredFrames = 0;
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
  var powerBar = new PowerBar(canvas, ctx);
  var shootAnimation = new Image(5121, 658);
	shootAnimation.src = '../../graphics/shootAnimation(fixedRez).png';
  var explosionAnimation = new Image(234, 26);
  explosionAnimation.src = '../../graphics/explosion.png';
  var enemyTankSheet = new Image(270, 148);
  enemyTankSheet.src = '../../graphics/enemyShooting.png';
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
		addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers, enemyTank, powerBar);
		var enemyShootFrames = 0;
		var poweredFrames = 0;
		window.setInterval(() => {
		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// draw tank
		mainTank.drawTank();

		// draw enemy tank
		enemyTank.drawTank();
		// draw hp
		hitpointsGUI.refreshHp();

    // draw powerbar
    powerBar.drawPowerBar();

    // draw weapons
		weaponsGUI.drawWeapon();
		if (weaponsGUI.loadingBar < 1) {
		  weaponsGUI.loadWeapon();
		}
		//draw target

		switch(mouseIsOn){
			case "engineRoom":
				ctx.drawImage(crosshair, enemyTank.position.x + 315, enemyTank.position.y + 185, 100, 100);
				break;
			case "driverRoom":
				ctx.drawImage(crosshair, enemyTank.driverRoom.x0+35, enemyTank.driverRoom.y0-25, 100, 100);
				break;
			case "gunRoom":
				ctx.drawImage(crosshair, enemyTank.gunRoom.x0 - 20, enemyTank.gunRoom.y0, 100, 100);
				break;
			default:

		}

		//enemy shoot
		if(enemyShootFrames >=110 && enemyTank.gunRoom.hp>0){
			enemyShootFrames = 0;
			lasers.push(new Laser(canvas, ctx, enemyTank.gunPosition.x + 50, enemyTank.gunPosition.y, 100, 180));
			enemyTank.shoot = true;
			var cannonSound = new Audio('../../music/Cannon+3.mp3')
			cannonSound.play();
		}
		if(poweredFrames >= 440 && mainTank.engineRoom.hp > 0){
			poweredFrames = 0;
			if(mainTank.engineRoom.powered){
				let rooms = [mainTank.driverRoom.hp, mainTank.gunRoom.hp, mainTank.engineRoom.hp];
				switch (rooms.indexOf(Math.min(mainTank.driverRoom.hp, mainTank.gunRoom.hp, mainTank.engineRoom.hp))){
					case 0:
						if (mainTank.driverRoom.hp < 3){
							mainTank.driverRoom.hp++;
						}
						break;
					case 1:
						if (mainTank.gunRoom.hp < 3){
							mainTank.gunRoom.hp++;
						}
						break;
					case 2:
						if (mainTank.engineRoom.hp < 3){
							mainTank.engineRoom.hp++;
						}
						break;
					default:
				}
			}
			
		}
		
		//draw lasers
		for(var i in lasers){
			lasers[i].drawLaser();
			if(lasers[i].lineStart.x > 1024 || lasers[i].lineStart.y > 768 || lasers[i].lineStart.x < 0 || lasers[i].lineStart.y < 0){ //checks bounds
				lasers.splice(i, 1);
			} else if (enemyTank.gunRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){ //checks enemy
				hitpointsGUI.enemyHitCount++;
				enemyTank.gunRoom.hp--;
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			} else if (enemyTank.driverRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
				hitpointsGUI.enemyHitCount++;
				enemyTank.driverRoom.hp--;
				if(enemyTank.driverRoom.hp <=0){
					mainTank.target.config1.angle = 10;
					mainTank.target.config2.angle = 10;
					mainTank.target.config3.angle = 10;
				}
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			} else if (enemyTank.engineRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
				hitpointsGUI.enemyHitCount++;
				enemyTank.engineRoom.hp--;
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			} else if(mainTank.gunRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){  //check player
				hitpointsGUI.hitCount++;
				if (mainTank.gunRoom.hp > 0){
					mainTank.gunRoom.hp--;
				}
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			} else if (mainTank.driverRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
				hitpointsGUI.hitCount++;
				if (mainTank.driverRoom.hp > 0){
					mainTank.driverRoom.hp--;
				}
				if(mainTank.driverRoom.hp <=0){
					enemyTank.target.config1.angle = 10;
					enemyTank.target.config2.angle = 10;
					enemyTank.target.config3.angle = 10;
				}
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			} else if (mainTank.engineRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
				hitpointsGUI.hitCount++;
				if (mainTank.engineRoom.hp > 0){
					mainTank.engineRoom.hp--;
				}
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
		poweredFrames++;

	  }, 1000 / 60);
	}

};
