export default class SoundController {
  constructor() {
    this.explosionSound = document.getElementById('explosion')
    this.hitSound = document.getElementById('hit')
    this.powerDownSound = document.getElementById('powerdown')
    this.powerUpSound = document.getElementById('powerup')
    this.shieldSound = document.getElementById('shieldSound')
    this.shotSound = document.getElementById('shot')
  }

  explosion() {
    this.explosionSound.currentTime = 0
    this.explosionSound.play()
  }

  hit() {
    this.hitSound.currentTime = 0
    this.hitSound.play()
  }

  powerDown() {
    this.powerDownSound.currentTime = 0
    this.powerDownSound.play()
  }

  powerUp() {
    this.powerUpSound.currentTime = 0
    this.powerUpSound.play()
  }

  shield() {
    this.shieldSound.currentTime = 0
    this.shieldSound.play()
  }

  shot() {
    this.shotSound.currentTime = 0
    this.shotSound.play()
  }
}
