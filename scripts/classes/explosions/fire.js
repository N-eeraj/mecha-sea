import Explosion from "./base.js"

export default class Fire extends Explosion {
  constructor(options) {
    super(options)
    this.image = document.getElementById('fire')
  }
}
