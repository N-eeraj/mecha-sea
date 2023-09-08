import InputHandler from "./input.js"
import Player from "./player.js"
import {
  Angler1,
  Angler2,
  Lucky,
  Hivewhale,
  Drone,
} from "./enemies/index.js"
import {
  Fire,
  Smoke,
} from "./explosions/index.js"
import Particles from "./particles.js"
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
      interval: 2500,
      minInterval: 1000,
    }
    this.particles = []
    this.explosions = []

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
          case 'hive':
            this.player.takeDamage(enemy.damage)
            break
          case 'lucky':
            this.player.enterPowerUp()
            break
        }
        enemy.readyToRemove = true
        this.showParticles(enemy, 5)
        this.showExplosion(enemy)
      }

      // projectile collision
      this.player.projectiles.forEach(projectile => {
        if (this.checkCollission(projectile, enemy)) {
          projectile.readyToRemove = true
          this.showParticles(enemy, 1)

          if (--enemy.health <= 0) {
            enemy.readyToRemove = true
            this.showExplosion(enemy)
            this.score += enemy.score
            this.showParticles(enemy, 5)
            if (enemy.type === 'hive') {
              for (let i = 0; i < 5; i++) {
                this.enemy.current.push(new Drone({
                  game: this,
                  x: enemy.x + Math.random() * enemy.width,
                  y: enemy.y + Math.random() * enemy.height,
                }))
              }
            }
          }
        }
      })
    })
    this.enemy.current = this.enemy.current.filter(({ readyToRemove }) => !readyToRemove)

    this.particles.forEach(particle => particle.update())
    this.particles = this.particles.filter(({ readyToRemove }) => !readyToRemove)

    this.explosions.forEach(explosion => explosion.update(deltaTime))
    this.explosions = this.explosions.filter(({ readyToRemove }) => !readyToRemove)

    this.background.update()
    this.background.foregroundLayer.update()
    this.player.update(deltaTime)

    if (this.enemy.interval > this.enemy.minInterval)
      --this.enemy.interval
  }

  draw(context) {
    this.background.draw(context)
    if (!this.gameOver)
      this.player.draw(context)
    this.enemy.current.forEach(enemy => enemy.draw(context))
    this.particles.forEach(particle => particle.draw(context))
    this.explosions.forEach(explosion => explosion.draw(context))
    this.background.foregroundLayer.draw(context)
    this.ui.draw(context)
  }

  addEnemy() {
    const random = Math.random()
    this.enemy.current.push((() => {
      if (random < 0.4) return new Angler1(this)
      if (random < 0.8) return new Angler2(this)
      if (random < 0.9) return new Lucky(this)
      return new Hivewhale(this)
    })())
  }

  checkCollission(object1, object2) {
    if (!this.gameOver)
      return (
        object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.y + object1.height > object2.y
      )
  }

  showParticles(enemy, count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particles({
        game: this,
        x: enemy.x + enemy.width * 0.5,
        y: enemy.y + enemy.height * 0.5,
      }))
    }
  }

  showExplosion(enemy) {
    const options = {
      game: this,
      x: enemy.x + enemy.width * 0.5,
      y: enemy.y + enemy.height * 0.5,
    }
    this.explosions.push((() => {
      if (Math.random() < 0.5) return new Smoke(options)
      return new Fire(options)
    })())
  }

  triggerGameOver() {
    this.gameOver = true
  }
}
