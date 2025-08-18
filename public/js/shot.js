import {TAMX, TAMY} from "./config.js"
import {space} from "./space.js"

const estados = [
    "assets/png/laserGreen.png",
    "assets/png/laserGreenShot.png",
]


class Shot{
    constructor(base,esquerda){
        this.element = document.createElement("img")
        this.element.id="shot"
        this.estado = 0
        this.initialImageSrc = estados[this.estado]
        this.element.src = this.initialImageSrc
        this.speed = 5
        //ele nao tem um left, ele comeca onde a nave esta
        this.element.style.position = 'absolute'
        //precisa verificar quantos pixels vai ficar aqui
        this.element.style.bottom = `${base}px`
        this.element.style.left = `${esquerda}px`
        this.isMarkedForRemoval = false
        space.element.appendChild(this.element)
    }

    move(){
        if(this.isMarkedForRemoval ) return

        const newBotton = parseInt(this.element.style.bottom) + this.speed
        this.element.style.bottom = `${newBotton}px`

        //nao tenho certeza dessa parte, investigar
        if (newBotton > TAMY) {
            this.isMarkedForRemoval = true
        }

    }
}

let shots = []

export const createShot = (base,esquerda)=>{
    shots.push(new Shot(base,esquerda))
}

export const moveShots = () => {
    shots.forEach(shot => shot.move())
    shots = shots.filter(shot => {
        if (shot.isMarkedForRemoval || !shot.element.parentNode) {
            if (shot.element.parentNode) {
                shot.element.remove()
            }
            return false
        }
        return true
    })
}

export const clearAllShots = () => {
    shots.forEach(shot => {
        if (shot.element.parentNode) {
            shot.element.remove()
        }
    })
    ufos.length = 0
}