export default class InputHandler {
  constructor(game) {
    this.game = game
    window.addEventListener('keydown', ({ key }) => {
      if (['ArrowUp', 'ArrowDown'].includes(key) && !this.game.keys.includes(key))
        this.game.keys.push(key)
      else if (key === ' ') {
        this.game.player.shootTop()
        if (this.game.player.powerUp.state)
          this.game.player.shootBottom()
      }
    })
    window.addEventListener('keyup', ({ key }) => this.game.keys = this.game.keys.filter(k => k !== key))
  }
}
