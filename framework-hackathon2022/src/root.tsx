import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import {Canvas} from "./Components";
import {get, set} from "./Libs";
import {drawFirework, firework, makeFirework} from "./Libs/fireworks";

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

const fireworkCount = 10

function Root() {
  const width = 1400;
  const height = 900;
  const fireworks: firework[] = [];


  let time = Date.now();
  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {

    for (const firework of fireworks) {
      if (frameCount < firework.startOffset) continue;

      drawFirework(firework, ctx, frameCount);
    }

    // ctx.filter = 'blur(1px)'

    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.rect(0, 0, 2, 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.moveTo(0,height/2);

/*
    // return;
    const drawRadius = 150
    const outerMultiple = 2

    // 𝑥=𝑟sin𝜃 , 𝑦=𝑟cos𝜃.
    const offX = drawRadius * outerMultiple * Math.sin(frameCount * 0.0015 * Math.PI) + width / 2
    const offY = drawRadius * outerMultiple * Math.cos(frameCount * 0.0015 * Math.PI) + height / 2
    const arcStart = Math.PI * 0.005 * (frameCount - 25)
    const arcEnd = Math.PI * 0.005 * (frameCount + 25)

    const red = (Math.sin((frameCount + 100) * 0.01 * Math.PI) + 1) * 127
    const green = (Math.sin((frameCount + 50) * 0.01 * Math.PI) + 1) * 127
    const blue = (Math.sin((frameCount) * 0.01 * Math.PI) + 1) * 127
    drawArc(ctx, offX, offY, drawRadius, false, arcStart, arcEnd, `rgb(${red}, ${green}, ${blue})`)

 */
  }

  useEffect(() => {
    const doDataStuff = async () => {
      await set('me', 'test data ' + Math.random())
      await get('me')
    }

    doDataStuff().catch(console.error);

    for (let i = 0; i < fireworkCount; i++) {
      fireworks.push(makeFirework(height, width))
    }
  })

  return (
    <CenterWrap>
      <Canvas draw={draw} width={width} height={height} refreshInterval={1}/>
    </CenterWrap>
  )
}

export default Root;
