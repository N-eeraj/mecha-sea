import Enemy from './base.js'

export default class Angler2 extends Enemy {
  constructor(game) {
    const image = document.getElementById('angler2')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: Math.floor(Math.random() * 2),
        max: 38,
      },
      speed: 1.5,
      score: 12,
      health: 5,
      damage: 2,
    })
    this.width = 213
    this.height = 169
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
