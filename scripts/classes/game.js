import InputHandler from "./input.js"
import Player from "./player.js"

export default class Game {
  constructor({ width, height }) {
    this.width = width
    this.height = height
    this.keys = []
    this.playerAmmo = 25

    this.player = new Player(this)
    this.input = new InputHandler(this)
  }

  update() {
    this.player.update()
  }

  draw(context) {
    this.player.draw(context)
  }
}
