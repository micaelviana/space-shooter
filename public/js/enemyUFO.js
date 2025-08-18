import {getRandomSpeed , TAMX, TAMY, PROB_ENEMY_UFO} from "./config.js"
import {space} from "./space.js"

class UFO {
    constructor() {
        this.element = document.createElement("img")
        this.element.className = "ufo-class"
        this.element.src = "assets/png/enemyUFO.png"
        this.element.style.position = 'absolute'
        this.element.style.top = "-20px"
        this.element.style.left = `${parseInt(Math.random() * (TAMX - (this.element.width || 50)))}px`
        this.speed = getRandomSpeed()
        this.isMarkedForRemoval = false
        this.score = 20
        //nao gostei tanto disso
        this.element.dataset.score = this.score
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

let ufos = []

export const createRandomUFO = () => {
    if (Math.random() < PROB_ENEMY_UFO) ufos.push(new UFO())
}

export const moveUFOs = () => {
    ufos.forEach(ufo => ufo.move())
    ufos = ufos.filter(ufo => {
        if (ufo.isMarkedForRemoval || !ufo.element.parentNode) {
            if (ufo.element.parentNode) {
                ufo.element.remove()
            }
            return false
        }
        return true
    })
}

export const clearAllUFOs = () => {
    ufos.forEach(ufo => {
        if (ufo.element.parentNode) {
            ufo.element.remove()
        }
    })
    ufos.length = 0
}
