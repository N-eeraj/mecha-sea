class Layer {
  constructor({ game, image, speed }) {
    this.game = game
    this.image = image
    this.speed = speed
    this.x = 0
    this.y = 0
    this.width = 1768
    this.height = 500
  }

  update() {
    if (this.x <= -this.width) this.x = 0
    else this.x -= this.speed
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y)
    context.drawImage(this.image, this.x + this.width, this.y)
  }
}

export default class Background {
  constructor(game) {
    this.game = game
    this.images = {
      layer1: document.getElementById('layer1'),
      layer2: document.getElementById('layer2'),
      layer3: document.getElementById('layer3'),
      layer4: document.getElementById('layer4'),
    }

    this.backgroundLayers = [
      {
        game: this.game,
        image: this.images.layer1,
        speed: 0.1,
      },
      {
        game: this.game,
        image: this.images.layer2,
        speed: 0.25,
      },
      {
        game: this.game,
        image: this.images.layer3,
        speed: 0.5,
      },
    ].map(layer => new Layer(layer))

    this.foregroundLayer = new Layer({
      game: this.game,
      image: this.images.layer4,
      speed: 1.2,
    })
  }

  update() {
    this.backgroundLayers.forEach(layer => layer.update())
  }

  draw(contex) {
    this.backgroundLayers.forEach(layer => layer.draw(contex))
  }
}
