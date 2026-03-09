import { TAMX, resetSpeed } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]
const DAMAGED_IMAGE_SRC = "assets/png/playerDamaged.png";

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1 // 0: left, 1: center, 2: right
    this.normalImageSrc = directions[this.direction];
    this.element.src = this.normalImageSrc;
    this.element.style.bottom = "20px"
    this.element.style.left = `${Math.floor((TAMX - 100) / 2)}px` // Center the ship initially
    this.lives = 4;
    this.isDamaged = false; // To prevent taking damage again while already damaged
    space.element.appendChild(this.element)
  }
  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2) {
      this.direction = this.direction + giro
      if (!this.isDamaged) { // Only change to directional sprite if not damaged
        this.normalImageSrc = directions[this.direction];
        this.element.src = this.normalImageSrc;
      }
    }
  }
  move() {
    //isso aqui impede a nave de ir ao infinito e além
    // console.log(this.element.style.left)
    const currentLeft = parseInt(this.element.style.left);
    const step = 1; // Movement speed, can be adjusted

    const shipWidth = this.element.offsetWidth || 100;
    const maxLeft = Math.max(0, TAMX - shipWidth);

    if (this.direction === 0) { // Moving left
      this.element.style.left = `${Math.max(0, currentLeft - step)}px`
    }
    if (this.direction === 2) { // Moving right
      this.element.style.left = `${Math.min(maxLeft, currentLeft + step)}px`
    }
  }

  takeDamage() {
    if (this.isDamaged) return false; // Already damaged, do nothing

    this.lives--;
    this.isDamaged = true;
    this.element.src = DAMAGED_IMAGE_SRC;

    // Revert to normal image after 5 seconds
    setTimeout(() => {
      this.isDamaged = false;
      // Restore correct directional image or default if direction hasn't changed
      this.element.src = directions[this.direction] || this.normalImageSrc; 
    }, 5000);

    return this.lives <= 0; // Returns true if game over
  }

  reset() {
    this.lives = 4;
    this.direction = 1; // Center
    this.normalImageSrc = directions[this.direction];
    this.element.src = this.normalImageSrc;
    const shipWidth = this.element.offsetWidth || 100;
    this.element.style.left = `${Math.floor((TAMX - shipWidth) / 2)}px`;
    this.isDamaged = false;
    
    //isso aqui vem da config, nao tem this
    resetSpeed();
  }
}

export const ship = new Ship()
