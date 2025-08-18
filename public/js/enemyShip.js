import { getRandomSpeed, TAMX, TAMY, PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship-class"
    this.element.src = "assets/png/enemyShip.png"
    this.element.style.position = 'absolute'
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * (TAMX - this.element.width || TAMX - 50))}px`
    this.speed = getRandomSpeed()
    this.score = 50
    this.element.dataset.score = this.score
    this.isMarkedForRemoval = false
    space.element.appendChild(this.element)
  }

  move() {
    if (this.isMarkedForRemoval) return

    const newTop = parseInt(this.element.style.top) + this.speed
    this.element.style.top = `${newTop}px`

    if (newTop > TAMY) {
      this.isMarkedForRemoval = true
    }
  }
}

let enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => {
  enemyShips.forEach(ship => ship.move())
  enemyShips = enemyShips.filter(ship => {
    if (ship.isMarkedForRemoval || !ship.element.parentNode) {
      if (ship.element.parentNode) {
        ship.element.remove()
      }
      return false
    }
    return true
  })
}

export const clearAllEnemyShips = () => {
  enemyShips.forEach(ship => {
    if (ship.element.parentNode) {
      ship.element.remove()
    }
  })
  enemyShips.length = 0
}
