import InputHandler from "./input.js"
import Player from "./player.js"
import UI from "./ui.js"

export default class Game {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.keys = []
    this.ammo = {
      current: 25,
      max: 50,
      timer: 50,
      interval: 500,
    }

    this.player = new Player(this)
    this.input = new InputHandler(this)
    this.ui = new UI(this)
  }

  update(deltaTime) {
    if (this.ammo.timer > this.ammo.interval) {
      if (this.ammo.current < this.ammo.max) {
        this.ammo.current++
        this.ammo.timer = 0
      }
    }
    else {
      this.ammo.timer += deltaTime
    }

    this.player.update()
  }

  draw(context) {
    this.player.draw(context)
    this.ui.draw(context)
  }
}
