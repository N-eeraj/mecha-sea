import Projectile from "./projectile.js"

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 120
    this.height = 190
    this.image = document.getElementById('player')
    this.frame = {
      x: 0,
      y: 0,
      max: 37
    }
    this.x = 20
    this.y = 100
    this.speedY = 0
    this.maxSpeed = 3
    this.projectiles = []
  }

  update() {
    // handle movement
    if (this.game.keys.includes('ArrowUp')) (this.speedY += 5)
    else if (this.game.keys.includes('ArrowDown')) (this.speedY -= 5)
    else this.speedY = 0

    this.y -= this.speedY
    if (this.y < 0) this.y = 0
    else if (this.y + this.height > this.game.height) this.y = this.game.height - this.height

    // handle projectiles
    this.projectiles.forEach(projectile => projectile.update())
    this.projectiles = this.projectiles.filter(({ readyToRemove }) => !readyToRemove)

    if (this.frame.x < this.frame.max) ++this.frame.x
    else this.frame.x = 0
  }

  draw(context) {
    context.fillStyle = 'blue'
    context.drawImage(this.image, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    this.projectiles.forEach(projectile => projectile.draw(context))
  }

  shootTop() {
    if (!this.game.ammo.current) return
    this.projectiles.push(new Projectile(this.game, this.x + this.width - 25, this.y + 30))
    this.game.ammo.current--
  }
}
