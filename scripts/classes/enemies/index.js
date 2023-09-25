import Angler1 from './angler1.js'
import Angler2 from './angler2.js'
import Lucky from './lucky.js'
import Hivewhale from './hivewhale.js'
import Drone from './drone.js'
import Bulbwhale from './bulbwhale.js'
import Moonfish from './moonfish.js'
import Stalker from './stalker.js'
import Razorfin from './razorfin.js'

export const getRandomEnemy = game => {
  const random = Math.random()
    if (random < 0.25) return new Angler1(game)
    if (random < 0.5) return new Angler2(game)
    if (random < 0.6) return new Bulbwhale(game)
    if (random < 0.7) return new Stalker(game)
    if (random < 0.8) return new Razorfin(game)
    if (random < 0.9) return new Moonfish(game)
    if (random < 0.95) return new Hivewhale(game)
    return new Lucky(game)
}

export { Drone }
