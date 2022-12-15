
const drawArc = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, above: boolean = false, startAngle = 0, endAngle = Math.PI, color = '#FFFFFF') => {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, above);
  ctx.stroke();
  ctx.closePath();
}

const drawLine = (ctx: CanvasRenderingContext2D, [originX, originY]: number[], [endX, endY]: number[], color = '#FFFFFF') => {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(originX, originY)
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

export {drawArc, drawLine}
