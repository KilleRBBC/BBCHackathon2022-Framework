export type firework = {
  startOffset: number
  maxX: number
  maxY: number
  x: number
  y: number
  sparks: spark[]
}

export type spark = {
  // not coordinates, but magnitudes of fling in a direction [-1, 1]
  angle: number
  velocity: number
  color: string
}

export const sparkColors = [
  ['255,0,0', '255,220,220', '150,0,0'],
  ['0,0,255', '200,200,255', '150,150,255'],
  ['255,150,100', '150,100,0', '255, 200, 100'],
  ['200,250,100', '100,200,0', '50,100,0'],
]
