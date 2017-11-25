var number = 0;
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

function addControllers(canvas, ctx, hitpointsGUI, weaponsGUI) {
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
        weaponsGUI.isWeaponActive = true;
        // weaponActive(ctx, canvas)
      } else if (isOnWeapons && weaponsSelected) {
        weaponsSelected = false;
        weaponsGUI.isWeaponActive = false;
        // weaponInactive(ctx, canvas)
      } else if (isOnEnemy) {
        // Call enemy attack function
        console.log("Attack enemy");
      }

    }
  );
}

function loop() {

  console.log(number++);
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw tank

  // draw enemy tank

  // draw hp
  hitpointsGUI.refreshHp();

  // draw weapons
  weaponsGUI.drawWeapon();

}

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  var hitpointsGUI = new hpGUI(canvas, ctx);
  var weaponsGUI = new wpGUI(canvas, ctx);
  addControllers(canvas, ctx, hitpointsGUI, weaponsGUI);
  window.setInterval(() => {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw tank

    // draw enemy tank

    // draw hp
    hitpointsGUI.refreshHp();

    // draw weapons
    weaponsGUI.drawWeapon();
  }, 1000 / 60);
};
