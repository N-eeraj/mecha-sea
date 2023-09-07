import InputHandler from "./input.js"
import Player from "./player.js"
import {
  Angler1,
  Angler2,
  Lucky,
} from "./enemies.js"
import Background from "./background.js"
import UI from "./ui.js"

export default class Game {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.keys = []
    this.gameOver = false

    this.score = 0
    this.enemy = {
      current: [],
      timer: 0,
      interval: 1000,
    }

    this.player = new Player(this)
    this.input = new InputHandler(this)
    this.ui = new UI(this)
    this.background = new Background(this)
  }

  update(deltaTime) {
    // enemy updation
    if (this.enemy.timer > this.enemy.interval && !this.gameOver)  {
      this.addEnemy()
      this.enemy.timer = 0
    }
    else
      this.enemy.timer += deltaTime

    // enemy collisions
    this.enemy.current.forEach(enemy => {
      enemy.update()

      if (this.checkCollission(this.player, enemy)) {
        switch(enemy.type) {
          case 'damage':
            this.player.takeDamage(enemy.damage)
            break
          case 'lucky':
            this.player.enterPowerUp()
            break
        }
        enemy.readyToRemove = true
      }

      // projectile collision
      this.player.projectiles.forEach(projectile => {
        if (this.checkCollission(projectile, enemy)) {
          projectile.readyToRemove = true
          if (--enemy.health <= 0) {
            enemy.readyToRemove = true
            this.score += enemy.score
          }
        }
      })
    })
    this.enemy.current = this.enemy.current.filter(({ readyToRemove }) => !readyToRemove)

    this.background.update()
    this.background.foregroundLayer.update()
    this.player.update(deltaTime)
  }

  draw(context) {
    this.background.draw(context)
    this.player.draw(context)
    this.enemy.current.forEach(enemy => enemy.draw(context))
    this.background.foregroundLayer.draw(context)

    this.ui.draw(context)
  }

  addEnemy() {
    const random = Math.random()
    this.enemy.current.push((() => {
      if (random < 0.4) return new Angler1(this)
      if (random < 0.8) return new Angler2(this)
      return new Lucky(this)
    })())
  }

  checkCollission(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    )
  }

  triggerGameOver() {
    this.gameOver = true
  }
}
