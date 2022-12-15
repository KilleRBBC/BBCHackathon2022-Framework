import {drawArc, drawLine} from "../draw-tools";
import {firework, spark, sparkColors} from "./fireworks-types";

const sparkVelocity = 10
const sparkCount = 20

const makeFirework = (height: number, width: number): firework => {
  const firework = {
    maxX: width,
    maxY: height * 2 / 3,
    x: 0,
    y: 0,
    startOffset: Math.ceil(Math.random() * 500),
    sparks: []
  }
  moveFirework(firework)
  return firework;
}


const makeSparks = (count: number, colourList: string[] = ['white']): spark[] => {
  const sparks: spark[] = []
  for (let i = 0; i < count; i++) {
    sparks.push({
      angle: Math.random() * Math.PI * 2,
      velocity: Math.random() * sparkVelocity,
      color: colourList[i % colourList.length]
    })
  }
  return sparks
}

const moveFirework = (firework: firework): firework => {
  firework.x = Math.ceil(Math.random() * firework.maxX)
  firework.y = Math.ceil(Math.random() * firework.maxY)
  firework.sparks = makeSparks(sparkCount, sparkColors[Math.floor(Math.random() * sparkColors.length)])

  return firework
}


const drawFirework = (firework: firework, ctx: CanvasRenderingContext2D, frameCount: number) => {
  const launchFrames = 2
  const cycleCount = ((frameCount - firework.startOffset) % 120) / 10 + 1
  if (cycleCount === 1) {
    moveFirework(firework)
  }
  if (cycleCount < launchFrames) {
    // "launch" part of the cycle
    const launchY = firework.y + ((firework.maxY * 1.5 - firework.y) * (2 - cycleCount))
    drawLine(ctx, [firework.x, firework.y + launchY + 20], [firework.x, launchY])
  } else {
    //explosion part of the cycle
    const explosionCycleCount = cycleCount - launchFrames
    const lineAlpha = Math.min((10 - explosionCycleCount) / 5, 1)
    drawArc(ctx, firework.x, firework.y, 5 * explosionCycleCount, true, 0, Math.PI * 2, `rgba(100, 150, 255, ${lineAlpha * 0.2})`)
    for (const spark of firework.sparks) {
      drawArc(ctx,
        (firework.x + (spark.velocity * Math.cos(spark.angle)) * explosionCycleCount),
        (firework.y + (spark.velocity * Math.sin(spark.angle)) * explosionCycleCount - explosionCycleCount * 10 + explosionCycleCount ** 2),
        0.5 * explosionCycleCount,
        true,
        0,
        Math.PI * 2,
        `rgba(${spark.color},${lineAlpha}`)
    }
  }
}

export {makeFirework, moveFirework, drawFirework}
