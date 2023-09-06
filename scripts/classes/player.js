import Projectile from "./projectile.js"

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 120
    this.height = 190
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

    // handle projectiles
    this.projectiles.forEach(projectile => projectile.update())
    this.projectiles = this.projectiles.filter(({ readyToRemove }) => !readyToRemove)
  }

  draw(context) {
    context.fillStyle = 'blue'
    context.fillRect(this.x, this.y, this.width, this.height)
    this.projectiles.forEach(projectile => projectile.draw(context))
  }

  shootTop() {
    if (!this.game.ammo.current) return
    this.projectiles.push(new Projectile(this.game, this.x + this.width / 2, this.y))
    this.game.ammo.current--
  }
}
