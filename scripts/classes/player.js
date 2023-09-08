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
      max: 37,
    }
    this.x = 20
    this.y = 100
    this.hp = {
      current: 10,
      max: 10,
    }
    this.speedY = 0
    this.maxSpeed = 3
    this.projectiles = []
    this.ammo = {
      current: 25,
      max: 50,
      timer: 50,
      interval: 500,
    }
    this.powerUp = {
      state: false,
      timer: 0,
      limit: 10_000,
    }
  }

  update(deltaTime) {
    if (this.game.gameOver) return

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

    // ammo updation
    if (this.ammo.timer > this.ammo.interval) {
      if (this.ammo.current < this.ammo.max) {
        this.ammo.current++
        this.ammo.timer = 0
      }
      else
        this.ammo.current = this.ammo.max
    }
    else
      this.ammo.timer += deltaTime

    // power up updation
    if (this.powerUp.state) {
      if (this.powerUp.timer <= this.powerUp.limit) {
        this.ammo.current += 0.5
        this.powerUp.timer += deltaTime
        this.frame.y = 1
      }
      else {
        this.powerUp.state = false
        this.powerUp.timer = 0
        this.frame.y = 0
      }
    }

    if (this.frame.x < this.frame.max) ++this.frame.x
    else this.frame.x = 0
  }

  draw(context) {
    this.projectiles.forEach(projectile => projectile.draw(context))
    context.drawImage(this.image, this.frame.x * this.width, this.frame.y * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  shootTop() {
    if (this.ammo.current < 1) return
    this.projectiles.push(new Projectile(this.game, this.x + this.width - 25, this.y + 30))
    this.ammo.current--
  }

  shootBottom() {
    if (this.ammo.current < 1) return
    this.projectiles.push(new Projectile(this.game, this.x + this.width - 25, this.y + this.height - 10))
  }

  takeDamage(damage) {
    this.hp.current -= damage
    if (this.hp.current <= 0) this.game.triggerGameOver()
  }

  enterPowerUp() {
    this.powerUp.state = true
    this.powerUp.timer = 0
    this.ammo.current = this.ammo.max
  }
}
