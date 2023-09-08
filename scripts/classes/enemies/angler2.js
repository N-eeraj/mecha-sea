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
      speed: 3,
      score: 25,
      health: 6,
      damage: 2,
    })
    this.width = 213
    this.height = 169
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
