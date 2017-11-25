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
    return "isOnWeapons";
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
  if (mouseIsOn == "isOnWeapons") {
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

function gameLoop(ctx, canvas) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

window.onload = () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  gameLoop(ctx, canvas);
  weaponInactive(ctx, canvas);

};
