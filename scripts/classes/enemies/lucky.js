import Enemy from './base.js'

export default class Lucky extends Enemy {
  constructor(game) {
    const image = document.getElementById('lucky')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: Math.floor(Math.random() * 2),
        max: 38
      },
      speed: 6,
      score: 100,
      health: 3,
      type: 'lucky',
    })
    this.width = 99
    this.height = 95
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
