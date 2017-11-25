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

function checkMousePosition(mousePosition) {
  if ((mousePosition.x >= weaponsPosition.x0 && mousePosition.x <= weaponsPosition.x1) && (mousePosition.y >= weaponsPosition.y0 && mousePosition.y <= weaponsPosition.y1)) {
    return "weapons";
  } else if ((mousePosition.x >= enemyPosition.x0 && mousePosition.x <= enemyPosition.x1) && (mousePosition.y >= enemyPosition.y0 && mousePosition.y <= enemyPosition.y1)) {
    return "enemy";
  }
}

function mouseMoveEvent(event, canvas) {
  // Get mouse position
  mousePosition = {
    x: event.pageX - canvas.offsetLeft,
    y: event.pageY- canvas.offsetTop
  };

  var x0 = 237, y0 = 708, x1 = 337, y1 = 768;

  let mouseIsOn = checkMousePosition(mousePosition);
  if (mouseIsOn == "weapons") {
    isOnWeapons = true;
  } else if (mouseIsOn == "enemy") {
    isOnEnemy = true;
  } else {
    isOnWeapons = false;
    isOnEnemy = false;
  }
}

function addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers) {
  canvas.addEventListener(
    'mousemove',
    (event) => {
      mouseMoveEvent(event, canvas);
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
      } else if (isOnEnemy && weaponsSelected) {
        // Call enemy attack functionfunction()
        lasers.push(new Laser(canvas, ctx, 560, 200, 90, 0));
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
  var enemyTank = new EnemyTank(canvas, ctx);
  var mainTank;
  var shootAnimation = new Image(5121, 658);
	shootAnimation.src = '../../graphics/shootAnimation(fixedRez).png';
  var explosionAnimation = new Image(234, 26);
  explosionAnimation.src = '../../graphics/explosion.png';
  var explosions = [];
  var lasers = [];
  var imagesLoaded = 0;
  var imageQuantity = 2;
  shootAnimation.onload = () => {
		imagesLoaded++;
		mainTank = new MainTank(canvas, ctx, shootAnimation);
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
  
	var startGame = () => {
		addControllers(canvas, ctx, hitpointsGUI, weaponsGUI, mainTank, lasers, explosions);
		window.setInterval(() => {
		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// draw tank
		mainTank.drawTank();
		for(var i in lasers){
			lasers[i].drawLaser();
			if(lasers[i].lineStart.x > 1024 || lasers[i].lineStart.y > 768){
				lasers.splice(i, 1);
			}
			else if(lasers[i].lineEnd.x >= enemyPosition.x0 && lasers[i].lineEnd.y >= enemyPosition.y0 && lasers[i].lineEnd.x <= enemyPosition.x1 && lasers[i].lineEnd.y <= enemyPosition.y1){
				hitpointsGUI.enemyHitCount++;
				explosions.push(new Explosion(canvas, ctx, explosionAnimation, lasers[i].lineEnd.x, lasers[i].lineEnd.y));
				lasers.splice(i, 1);
			}
		}

		// draw enemy tank
		enemyTank.drawTank();
		for(var i in explosions){
			console.log(explosions);
			explosions[i].drawExplosion();
			if (explosions[i].i >= 36){
				explosions.splice(i, 1);
			}
		}
		// draw hp
		hitpointsGUI.refreshHp();

		// draw weapons
    weaponsGUI.drawWeapon();
    if (weaponsGUI.loadingBar < 1) {
      weaponsGUI.loadWeapon();
      console.log("loading bar: " + weaponsGUI.loadingBar);
    }

	  }, 1000 / 60);
	}
	  
};
