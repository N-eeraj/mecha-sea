import InputHandler from "./input.js"
import Player from "./player.js"
import { Angler } from "./enemies.js"
import UI from "./ui.js"

export default class Game {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.keys = []
    this.gameOver = false

    this.score = 0
    this.ammo = {
      current: 25,
      max: 50,
      timer: 50,
      interval: 500,
    }
    this.enemy = {
      current: [],
      timer: 0,
      interval: 1000,
    }

    this.player = new Player(this)
    this.input = new InputHandler(this)
    this.ui = new UI(this)
  }

  update(deltaTime) {
    // ammo updation
    if (this.ammo.timer > this.ammo.interval) {
      if (this.ammo.current < this.ammo.max) {
        this.ammo.current++
        this.ammo.timer = 0
      }
    }
    else
      this.ammo.timer += deltaTime

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
        this.gameOver = true
        enemy.readyToRemove = true
      }

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

    this.player.update()
  }

  draw(context) {
    this.player.draw(context)
    this.enemy.current.forEach(enemy => enemy.draw(context))
    this.ui.draw(context)
  }

  addEnemy() {
    this.enemy.current.push(new Angler(this))
  }

  checkCollission(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    )
  }
}
