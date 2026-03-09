import {getRandomSpeed, TAMX, TAMY, PROB_ENEMY_SMALL_METEOR} from "./config.js"
import {space} from "./space.js"

class SmallMeteor {
    constructor() {
        this.element = document.createElement("img")
        this.element.className = "small-meteor-class"
        this.element.src = "assets/png/meteorSmall.png"
        this.element.style.position = 'absolute'
        this.element.style.top = "-20px"
        this.element.style.left = `${parseInt(Math.random() * (TAMX - (this.element.width || 30)))}px`
        this.speed = getRandomSpeed()
        this.isMarkedForRemoval = false
        this.score = 100
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

let smallMeteors = []

export const createRandomSmallMeteor = () => {
    if (Math.random() < PROB_ENEMY_SMALL_METEOR) smallMeteors.push(new SmallMeteor())
}

export const moveSmallMeteors = () => {
    smallMeteors.forEach(meteor => meteor.move())
    smallMeteors = smallMeteors.filter(meteor => {
        if (meteor.isMarkedForRemoval || !meteor.element.parentNode) {
            if (meteor.element.parentNode) {
                meteor.element.remove()
            }
            return false
        }
        return true
    })
}

export const clearAllSmallMeteors = () => {
    smallMeteors.forEach(meteor => {
        if (meteor.element.parentNode) {
            meteor.element.remove()
        }
    })
    smallMeteors.length = 0
}
