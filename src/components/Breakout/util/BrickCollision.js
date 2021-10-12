export default function BrickCollision(circle, rect) {

  let distX = Math.abs(circle.x - rect.x - rect.w / 2);
  let distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.rad) {
    return {
      hit: false,
    };
  }
  if (distY > rect.h / 2 + circle.rad) {
    return {
      hit: false,
    };
  }

  if (distX <= rect.w / 2) {
    return {
      hit: true,
      axis: "Y",
    };
  }
  if (distY <= rect.h / 2) {
    return {
      hit: true,
      axis: "X",
    };
  }

  let dx = distX - rect.w / 2;
  let dy = distY - rect.h / 2;
  return {
    hit: dx * dx + dy * dy <= circle.rad * circle.rad,
    axis: "X",
  };
}
