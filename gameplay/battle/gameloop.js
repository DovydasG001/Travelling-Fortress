
var isOnWeapons = false;
var isOnEnemy = false;
var weaponsSelected = false;

var weaponsPosition = {
  x0: 237,
  y0: 708,
  x1: 337,
  y1: 768
};

var enemyPosition = {};

function checkMousePosition(mousePosition) {
  if ((mousePosition.x >= weaponsPosition.x0 && mousePosition.x <= weaponsPosition.x1) && (mousePosition.y >= weaponsPosition.y0 && mousePosition.y <= weaponsPosition.y1)) {
    return "weapons";
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
  } else {
    isOnWeapons = false;
  }
}

function weaponInactive(ctx, canvas) {
  ctx.fillStyle = 'red';
  ctx.fillRect(weaponsPosition.x0, weaponsPosition.y0, 120, 60);
}

function weaponActive(ctx, canvas) {
  ctx.fillStyle = 'green';
  ctx.fillRect(weaponsPosition.x0, weaponsPosition.y0, 120, 60);
}

function addControllers(ctx, canvas) {
  canvas.addEventListener(
    'mousemove',
    (event) => {
      mouseMoveEvent(event, canvas);
    }
  );

  canvas.addEventListener(
    'click',
    (event) => {
      if (isOnWeapons && !weaponsSelected) {
        weaponsSelected = true;
        weaponActive(ctx, canvas)
      } else if (isOnWeapons && weaponsSelected) {
        weaponsSelected = false;
        weaponInactive(ctx, canvas)
      } else if (isOnEnemy) {
        // Call enemy attack function
        console.log("Attack enemy");
      }
      console.log(weaponsSelected);
    }
  );
}

function loop(canvas, ctx, hitpointsGUI) {

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw tank
  // draw enemy tank
  // draw hp bar

  // draw hp

  hitpointsGUI.refreshHp();
  // draw weapons
}

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  var hitpointsGUI = new hpGUI(ctx, canvas);
  window.setInterval(loop(canvas, ctx, hitpointsGUI), 1000 / 60);


  // // draw background and initialize listeners // probably need to create another canvas for events
  // addControllers(weaponCtx, weaponCanvas);
  //
  //
  //
  // // draw weapons
  // weaponInactive(weaponCtx, weaponCanvas);

};
