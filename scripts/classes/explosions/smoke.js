import Explosion from "./base.js"

export default class Smoke extends Explosion {
  constructor(options) {
    super(options)
    this.image = document.getElementById('smoke')
  }
}
