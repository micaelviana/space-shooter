import {getRandomSpeed, TAMX, TAMY, PROB_ENEMY_BIG_METEOR} from "./config.js"
import {space} from "./space.js"

class BigMeteor {
    constructor() {
        this.element = document.createElement("img")
        this.element.className = "big-meteor-class"
        this.element.src = "assets/png/meteorBig.png"
        this.element.style.position = 'absolute'
        this.element.style.top = "-20px"
        this.element.style.left = `${parseInt(Math.random() * (TAMX - (this.element.width || 70)))}px`
        this.speed = getRandomSpeed()
        this.isMarkedForRemoval = false
        this.score = 10
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

let bigMeteors = []

export const createRandomBigMeteor = () => {
    if (Math.random() < PROB_ENEMY_BIG_METEOR) bigMeteors.push(new BigMeteor())
}

export const moveBigMeteors = () => {
    bigMeteors.forEach(meteor => meteor.move())
    bigMeteors = bigMeteors.filter(meteor => {
        if (meteor.isMarkedForRemoval || !meteor.element.parentNode) {
            if (meteor.element.parentNode) {
                meteor.element.remove()
            }
            return false
        }
        return true
    })
}

export const clearAllBigMeteors = () => {
    bigMeteors.forEach(meteor => {
        if (meteor.element.parentNode) {
            meteor.element.remove()
        }
    })
    bigMeteors.length = 0
}
