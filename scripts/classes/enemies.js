class Enemy {
  constructor({ game, image, frames, speed, health, score, damage = 0, type = 'damage' }) {
    this.game = game
    this.image = image
    this.x = this.game.width
    this.frame = frames
    this.health = health
    this.score = score
    this.speedX = -speed
    this.damage = damage
    this.type = type
    this.readyToRemove = false
  }

  update() {
    this.x += this.speedX
    if (this.x + this.width <= 0)
      this.readyToRemove = true

    if (this.frame.x < this.frame.max) ++this.frame.x
    else this.frame.x = 0
  }

  draw(context) {
    context.drawImage(this.image, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export class Angler1 extends Enemy {
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
      speed: 1.75,
      score: 10,
      health: 5,
      damage: 1,
    })
    this.width = 228
    this.height = 169
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}

export class Angler2 extends Enemy {
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

export class Lucky extends Enemy {
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
      speed: 3,
      score: 25,
      health: 3,
      type: 'lucky',
    })
    this.width = 99
    this.height = 95
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
  }
}
