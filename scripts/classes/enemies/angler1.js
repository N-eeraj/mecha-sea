import Enemy from './base.js'

export default class Angler1 extends Enemy {
  constructor(game) {
    const image = document.getElementById('angler1')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: Math.floor(Math.random() * 3),
        max: 38,
      },
      speed: 3.5,
      score: 25,
      health: 5,
      damage: 2,
    })
    this.width = 228
    this.height = 169
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
