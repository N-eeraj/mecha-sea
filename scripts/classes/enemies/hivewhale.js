import Enemy from './base.js'

export default class Hivewhale extends Enemy {
  constructor(game) {
    const image = document.getElementById('hivewhale')
    super({
      game,
      image,
      frames: {
        x: 0,
        y: 0,
        max: 38,
      },
      speed: 1,
      score: 20,
      health: 10,
      damage: 5,
      type: 'hive'
    })
    this.width = 400
    this.height = 227
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
