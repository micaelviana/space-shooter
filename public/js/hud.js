export class HUD {
    constructor() {
        this.score = 0;
        this.livesElement = document.getElementById('lives');
        this.scoreElement = document.getElementById('score');
        this.updateScore();
        this.updateLivesDisplay(4);
    }

    updateLivesDisplay(currentLives) {
        this.livesElement.innerHTML = ''; 
        const livesToShow = Math.max(0, currentLives - 1); 
        for (let i = 0; i < livesToShow; i++) {
            const lifeImg = document.createElement('img');
            lifeImg.src = 'assets/png/life.png'; 
            this.livesElement.appendChild(lifeImg);
        }
    }

    updateScore() {
        this.scoreElement.textContent = String(this.score).padStart(6, '0');
    }

    addPoints(points) {
        this.score += points;
        this.updateScore();
    }

    resetScore() {
        this.score = 0;
        this.updateScore();
    }
}

// Exportar uma única instância do HUD
export const hud = new HUD();
