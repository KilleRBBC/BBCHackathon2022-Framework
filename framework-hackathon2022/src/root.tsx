import React from 'react';
import Canvas from "./Components/Canvas";
import styled from "@emotion/styled";

const CenterWrap = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  
  > * {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  }
`

function Root() {
  const width = 1400;
  const height = 900;

  const drawArc = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, above: boolean = false, startAngle = 0, endAngle = Math.PI, color = '#FFFFFF') => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, above);
    ctx.stroke();
    ctx.closePath();
  }

  const drawLine = (ctx: CanvasRenderingContext2D, [originX, originY]: number[], [endX, endY]: number[]) => {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, originY)
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  let time = Date.now();
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.filter = 'blur(1px)'
    // ctx.clearRect(0,0, width, height)


    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.rect(0, 0, 2, 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.moveTo(0,height/2);


    // return;
    const drawRadius = 150
    const outerMultiple = 2

    // 𝑥=𝑟sin𝜃 , 𝑦=𝑟cos𝜃.
    const offX = drawRadius * outerMultiple * Math.sin(frameCount * 0.0015 * Math.PI) + width / 2
    const offY = drawRadius * outerMultiple * Math.cos(frameCount * 0.0015 * Math.PI) + height / 2
    const posX = 200+frameCount
    const posY = height / 2
    const arcStart = Math.PI * 0.005 * (frameCount-25)
    const arcEnd = Math.PI * 0.005 * (frameCount+25)

    const red = (Math.sin((frameCount+100)*0.01*Math.PI)+1) * 127
    const green = (Math.sin((frameCount+50)*0.01*Math.PI)+1) * 127
    const blue = (Math.sin((frameCount)*0.01*Math.PI)+1) * 127
    drawArc(ctx, offX, offY, drawRadius, false, arcStart, arcEnd, `rgb(${red}, ${green}, ${blue})`)


    // let lastRecNum:number;
    // recContainer.forEach((recNum, i) => {
    //   if (lastRecNum != undefined) {
    //     drawArc(ctx, lastRecNum, recNum, !!(i%2));
    //   }
    //   lastRecNum = recNum;
    // })
  }

  return (
    <CenterWrap>
      <Canvas draw={draw} width={width} height={height} refreshInterval={0}/>
    </CenterWrap>
  )
}

export default Root;
