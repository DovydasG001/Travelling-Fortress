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
        lasers.push(new Laser(canvas, ctx, mainTank.gunPosition.x, mainTank.gunPosition.y, mainTank.target[mainTank.currentTarget].angle, mainTank.target[mainTank.currentTarget].rotation, false, "mainTank"));
		    mainTank.shoot = true;
        var cannonSound = new Audio('../../music/Cannon+3.mp3');
        cannonSound.volume = 0.2;
		    cannonSound.play();
        weaponsSelected = false;
        weaponsGUI.isWeaponActive = false;
        weaponsGUI.depleteWeapon();
      } else if (isOnW) {
        powerBar.setPoweredRoom("W");
        // change loading speed
        weaponsGUI.setLoadSpeed('powered');
		mainTank.engineRoom.powered = false;
		mainTank.driverRoom.powered = false;
		poweredFrames = 0;
      } else if (isOnE) {
        powerBar.setPoweredRoom("E");
        weaponsGUI.setLoadSpeed('unpowered');
		mainTank.engineRoom.powered = true;
		mainTank.driverRoom.powered = false;
		poweredFrames = 0;
      } else if (isOnD) {
        powerBar.setPoweredRoom("D");
        weaponsGUI.setLoadSpeed('unpowered');
		mainTank.engineRoom.powered = false;
		mainTank.driverRoom.powered = true;
		poweredFrames = 0;
      }

    }
  );
}

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  var hitpointsGUI = new hpGUI(canvas, ctx);
  var mainTank;
  var enemyTank;
  var shootAnimation = new Image(5121, 658);
	shootAnimation.src = '../../graphics/shootAnimation(fixedRez).png';
  var explosionAnimation = new Image(234, 26);
  explosionAnimation.src = '../../graphics/explosion.png';
  var enemyTankSheet = new Image(270, 148);
  enemyTankSheet.src = '../../graphics/enemyShooting.png';
  var crosshair = new Image(300, 300);
  crosshair.src = '../../graphics/crosshair.gif';
  var wrench = new Image (700, 100);
  wrench.src = '../../graphics/wrench.png';
  var background = new Image (1024, 768);
  background.src = '../../graphics/ruinedCityBackground.png';
  var mainTankExplosions = new Image(25605, 658);
  mainTankExplosions.src = '../../graphics/mainTankExplosion2.png';
  // Power bar images
  var engineImg = new Image(30, 30);
  engineImg.src = '../../graphics/engineRoomPic.png';
  var weaponImg = new Image(30, 30);
  weaponImg.src = '../../graphics/gunnerPic.png';
  var driverImg = new Image(30, 30);
  driverImg.src = '../../graphics/driverSeatPic.png';

  // Weapon loading image
  var weaponLoadImg = new Image(71,33);
  weaponLoadImg.src = '../../graphics/missile.png';
  var weaponsGUI = new wpGUI(canvas, ctx, weaponLoadImg);

  //Player tank room explosions
  


  var explosions = [];
  var lasers = [];
  var wrenches = [];
  var imagesLoaded = 0;
  var imageQuantity = 11;
  var powerBar;

  weaponLoadImg.onload = () => {
    imagesLoaded++;
      if (imagesLoaded == imageQuantity){
        startGame();
      }
  }

  engineImg.onload = () => {
	imagesLoaded++;
  	if (imagesLoaded == imageQuantity){
  		startGame();
  	}
  }
  weaponImg.onload = () => {
	imagesLoaded++;
  	if (imagesLoaded == imageQuantity){
  		startGame();
  	}
  }
  driverImg.onload = () => {
	imagesLoaded++;
  	if (imagesLoaded == imageQuantity){
  		startGame();
  	}
  }

  shootAnimation.onload = () => {
		imagesLoaded++;
		if (imagesLoaded == imageQuantity){
			startGame();
		}
  }
  enemyTankSheet.onload = () => {
		imagesLoaded++;
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

  wrench.onload = () => {
	imagesLoaded++;
  	if (imagesLoaded == imageQuantity){
  		startGame();
  	}
  }

  background.onload = () => {
	imagesLoaded++;
  	if (imagesLoaded == imageQuantity){
  		startGame();
  	}
  }
  
  mainTankExplosions.onload = () => {
	imagesLoaded++;
  	if (imagesLoaded == imageQuantity){
  		startGame();
  	}
  }

	var startGame = () => {
		mainTank = new MainTank(canvas, ctx, shootAnimation, mainTankExplosions);
		enemyTank = new EnemyTank(canvas, ctx, enemyTankSheet, background);
		powerBar = new PowerBar(canvas, ctx, engineImg, weaponImg, driverImg);
		addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers, enemyTank, powerBar);
		var progressFrames = 0;
		var poweredFrames = 0;
		window.setInterval(() => {
		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// draw tank
		mainTank.drawTank();
		mainTank.drawGunroomExplosion();
		
		//draw lasers near player
		for(var i in lasers){
			//await lasers[i].drawLaser();
			if(lasers[i].nearEnemy == false){
				lasers[i].drawLaser();
				if(lasers[i].lineStart.y > 768 || lasers[i].lineStart.y < 0){ //checks bounds
					lasers.splice(i, 1);
				} else if(lasers[i].lineStart.x > 3000 || lasers[i].lineStart.x < 0){
					lasers[i].nearEnemy = true;
					lasers[i].lineEnd.x -= lasers[i].lineStart.x - enemyTank.position.x;
					lasers[i].lineStart.x -=  lasers[i].lineStart.x - enemyTank.position.x;
				} else if(mainTank.gunRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){  //check player
					hitpointsGUI.hitCount++;
					if (mainTank.gunRoom.hp > 0){
						mainTank.gunRoom.hp--;
						if(mainTank.gunRoom.hp == 0){
							mainTank.gunRoomExplodes = true;
							let explosionSound = new Audio('../../explosion.mp3');
							explosionSound.volume = 0.2;
							explosionSound.play();
						}
					}
					explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
					// Explosion sounds
					let explosionEffect = new Audio('../../impact.mp3');
					explosionEffect.volume = 0.2;
					explosionEffect.play();
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
					// Explosion sounds
					let explosionEffect = new Audio('../../impact.mp3');
					explosionEffect.volume = 0.2;
					explosionEffect.play();
					lasers.splice(i, 1);
				} else if (mainTank.engineRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
					hitpointsGUI.hitCount++;
					if (mainTank.engineRoom.hp > 0){
						mainTank.engineRoom.hp--;
					}
					explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
					// Explosion sounds
					let explosionEffect = new Audio('../../impact.mp3');
					explosionEffect.volume = 0.2;
					explosionEffect.play();
					lasers.splice(i, 1);
				}
			}
		}

		// draw enemy tank

		// draw hp
		hitpointsGUI.refreshHp();

    // draw powerbar
    powerBar.drawPowerBar();

    // draw weapons
		weaponsGUI.drawWeapon();
		if (weaponsGUI.loadingBar < 1) {
		  weaponsGUI.loadWeapon();
		}

		//enemy shoot
		if(progressFrames%440==0 && enemyTank.gunRoom.hp>0){
			let poweredDodging = 0;
			if (mainTank.driverRoom.powered && mainTank.driverRoom.hp>0){
				poweredDodging =4;
			}
			lasers.push(new Laser(canvas, ctx, enemyTank.gunPosition.x + 50, enemyTank.gunPosition.y, 8+poweredDodging, 183, true, "enemyTank"));
			enemyTank.shoot = true;
			var cannonSound = new Audio('../../music/Cannon+3.mp3');
			cannonSound.volume = 0.2;
			cannonSound.play();
		}
		if(progressFrames%660==0 && enemyTank.engineRoom.hp>0){
			let rooms = [enemyTank.driverRoom.hp, enemyTank.gunRoom.hp, enemyTank.engineRoom.hp];

			switch (rooms.indexOf(Math.min(enemyTank.driverRoom.hp, enemyTank.gunRoom.hp, enemyTank.engineRoom.hp))){
				case 0:
					if (enemyTank.driverRoom.hp < 3){
						enemyTank.driverRoom.hp++;
						wrenches.push(new Wrench(canvas, ctx, wrench,  enemyTank.driverRoom.x0 + (enemyTank.driverRoom.x1 -  enemyTank.driverRoom.x0)/2 - 50,  enemyTank.driverRoom.y0 + ( enemyTank.driverRoom.y1 -  enemyTank.driverRoom.y0)/2 - 80));
						var fixSound = new Audio('../../music/Impact-wrench.mp3')
						fixSound.volume = 0.2;
						fixSound.play();
					}
					break;
				case 1:
					if (enemyTank.gunRoom.hp < 3){
						enemyTank.gunRoom.hp++;
						wrenches.push(new Wrench(canvas, ctx, wrench,   enemyTank.gunRoom.x0 + ( enemyTank.gunRoom.x1 -  enemyTank.gunRoom.x0)/2 - 57,    enemyTank.gunRoom.y0 + ( enemyTank.gunRoom.y1 -  enemyTank.gunRoom.y0)/2 - 30));
						var fixSound = new Audio('../../music/Impact-wrench.mp3')
						fixSound.volume = 0.2;
						fixSound.play();
					}
					break;
				case 2:
					if (enemyTank.engineRoom.hp < 3){
						enemyTank.engineRoom.hp++;
						wrenches.push(new Wrench(canvas, ctx, wrench,  enemyTank.engineRoom.x0 + ( enemyTank.engineRoom.x1 - enemyTank.engineRoom.x0)/2+90, enemyTank.engineRoom.y0 + (enemyTank.engineRoom.y1 - enemyTank.engineRoom.y0)/2 + 70));
						var fixSound = new Audio('../../music/Impact-wrench.mp3')
						fixSound.play();
					}
					break;
				default:
			}
		}
		if(poweredFrames >= 440 && mainTank.engineRoom.hp > 0){
			poweredFrames = 0;
			if(mainTank.engineRoom.powered){
				let rooms = [mainTank.driverRoom.hp, mainTank.gunRoom.hp, mainTank.engineRoom.hp];
				switch (rooms.indexOf(Math.min(mainTank.driverRoom.hp, mainTank.gunRoom.hp, mainTank.engineRoom.hp))){
					case 0:
						if (mainTank.driverRoom.hp < 3){
							mainTank.driverRoom.hp++;
							wrenches.push(new Wrench(canvas, ctx, wrench,  mainTank.driverRoom.x0 + (mainTank.driverRoom.x1 - mainTank.driverRoom.x0)/2 - 40, mainTank.driverRoom.y0 + (mainTank.driverRoom.y1 - mainTank.driverRoom.y0)/2 - 10));
							var fixSound = new Audio('../../music/Impact-wrench.mp3')
							fixSound.play();
						}
						break;
					case 1:
						if (mainTank.gunRoom.hp < 3){
							mainTank.gunRoom.hp++;
							wrenches.push(new Wrench(canvas, ctx, wrench,  mainTank.gunRoom.x0 + (mainTank.gunRoom.x1 - mainTank.gunRoom.x0)/2 - 60,   mainTank.gunRoom.y0 + (mainTank.gunRoom.y1 - mainTank.gunRoom.y0)/2 + 20));
							var fixSound = new Audio('../../music/Impact-wrench.mp3')
							fixSound.play();
						}
						break;
					case 2:
						if (mainTank.engineRoom.hp < 3){
							mainTank.engineRoom.hp++;
							wrenches.push(new Wrench(canvas, ctx, wrench, mainTank.engineRoom.x0 + (mainTank.engineRoom.x1 - mainTank.engineRoom.x0)/2-100, mainTank.engineRoom.y0 + (mainTank.engineRoom.y1 - mainTank.engineRoom.y0)/2));
							var fixSound = new Audio('../../music/Impact-wrench.mp3')
							fixSound.play();
						}
						break;
					default:
				}
			}

		}
		ctx.drawImage(background, 0, 300, enemyTank.position.x1 - enemyTank.position.x, enemyTank.position.y1 - enemyTank.position.y, enemyTank.position.x, enemyTank.position.y, enemyTank.position.x1 - enemyTank.position.x, enemyTank.position.y1 - enemyTank.position.y);
		ctx.rect(enemyTank.position.x, enemyTank.position.y, enemyTank.position.x1 - enemyTank.position.x, enemyTank.position.y1 - enemyTank.position.y);
		ctx.stroke();
		enemyTank.drawTank();




		for(var i in lasers){
			if(lasers[i].nearEnemy == true){
				if (enemyTank.gunRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){ //checks enemy
					hitpointsGUI.enemyHitCount++;
					if (enemyTank.gunRoom.hp > 0){
						enemyTank.gunRoom.hp--;
					}
					explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
					// Explosion sounds
					let explosionEffect = new Audio('../../impact.mp3');
					explosionEffect.volume = 0.2;
					explosionEffect.play();
					lasers.splice(i, 1);
				} else if (enemyTank.driverRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
					hitpointsGUI.enemyHitCount++;
					if (enemyTank.driverRoom.hp > 0){
						enemyTank.driverRoom.hp--;
					}
					if(enemyTank.driverRoom.hp <=0){
						mainTank.target.config1.angle = 10;
						mainTank.target.config2.angle = 10;
						mainTank.target.config3.angle = 10;
					}
					explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
					// Explosion sounds
					let explosionEffect = new Audio('../../impact.mp3');
					explosionEffect.volume = 0.2;
					explosionEffect.play();
					lasers.splice(i, 1);
				} else if (enemyTank.engineRoom.collides(lasers[i].lineEnd.x, lasers[i].lineEnd.y)){
					hitpointsGUI.enemyHitCount++;
					if (enemyTank.engineRoom.hp > 0){
						enemyTank.engineRoom.hp--;
					}

					explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
					// Explosion sounds
					let explosionEffect = new Audio('../../impact.mp3');
					explosionEffect.volume = 0.2;
					explosionEffect.play();
					lasers.splice(i, 1);
				}

				console.log(lasers[i].lineStart.x);
				console.log(enemyTank.position.x);
				if(lasers[i].lineStart.y > enemyTank.position.y1 || lasers[i].lineStart.y < enemyTank.position.y){ //checks bounds
					lasers.splice(i, 1);
				} else if(lasers[i].lineStart.x > enemyTank.position.x && lasers[i].lineStart.y > enemyTank.position.y && lasers[i].lineEnd.x < enemyTank.position.x1 && lasers[i].lineEnd.y < enemyTank.position.y1 && lasers[i].lineStart.x < enemyTank.position.x1 && lasers[i].lineStart.y < enemyTank.position.y1 && lasers[i].lineEnd.x > enemyTank.position.x && lasers[i].lineEnd.y > enemyTank.position.y){ //checks bounds
					lasers[i].drawLaser();
				} else{
					console.log("AAAAA");
					let newLine = {
						x: undefined,
						y: undefined,
						x1: undefined,
						y1: undefined
					};
					 if(lasers[i].lineStart.x < enemyTank.position.x && lasers[i].owner == "mainTank"){
						newLine.x =  enemyTank.position.x;
					 } else {
						newLine.x = lasers[i].lineStart.x;
					 }
					 if(lasers[i].lineEnd.x > enemyTank.position.x1 && lasers[i].owner == "mainTank"){
						newLine.x1 = enemyTank.position.x1;
					} else {
						newLine.x1 = lasers[i].lineEnd.x
					}
					if (lasers[i].lineEnd.x < enemyTank.position.x  && lasers[i].owner == "enemyTank" ){
						newLine.x1 = enemyTank.position.x;
						newLine.y1 =  enemyTank.position.y;
					} else {
						newLine.x1 = lasers[i].lineEnd.x
					}
					 if(lasers[i].lineStart.y < enemyTank.position.y &&  lasers[i].owner == "mainTank"){
						newLine.y =  enemyTank.position.y;
					 }
					 if(lasers[i].lineEnd.y > enemyTank.position.y1){
						newLine.y1 =  enemyTank.position.y1;
					 }
					 if(lasers[i].lineEnd.y < enemyTank.position.y && lasers[i].owner == "enemyTank" ){
						newLine.y1 =  enemyTank.position.y;
					 }

					lasers[i].drawLaser(newLine);
					if(lasers[i].lineStart.x <= enemyTank.position.x && lasers[i].owner == "enemyTank"){
						lasers[i].nearEnemy = false;
						lasers[i].lineStart.x += 3000 - enemyTank.position.x;
						lasers[i].lineEnd.x += 3000 - enemyTank.position.x;
					}

				}
			}
		}
		//draw explosions
		for(var i in explosions){
			explosions[i].drawExplosion();
			if (explosions[i].i >= 36){
				explosions.splice(i, 1);
			}
		}

		//draw wrenches
		for(var i in wrenches){
			wrenches[i].drawWrench();
			if (wrenches[i].i >= 28){
				wrenches.splice(i, 1);
			}
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

		progressFrames++;
		poweredFrames++;

	  }, 1000 / 60);
	}

};
