import Enemy from './base.js'

export default class Drone extends Enemy {
  constructor({ game, x, y }) {
    const image = document.getElementById('drone')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: Math.floor(Math.random() * 2),
        max: 38,
      },
      speed: 2.5,
      score: 5,
      health: 3,
      damage: 1,
    })
    this.width = 115
    this.height = 95
    this.x = x
    this.y = y
  }
}
