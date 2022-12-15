export type firework = {
  startOffset: number
  x: number
  y: number
}

const makeFirework = (height: number, width: number): firework => {
  return {
    x: Math.ceil(Math.random() * width),
    y: Math.ceil(Math.random() * height),
    startOffset: Math.ceil(Math.random() * 500)
  }
}

const moveFirework = (firework: firework, height: number, width: number): firework => {
  firework.x = Math.ceil(Math.random() * width)
  firework.y = Math.ceil(Math.random() * height)

  return firework
}

export {makeFirework, moveFirework}
