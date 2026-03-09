import { FPS, MINUTO, increaseSpeed } from "./config.js" //importando uma constante
import { space } from "./space.js"//importando uma 
// objeto da classe space
import { ship } from "./ship.js" //importando um objeto da classe ship
import { createRandomUFO, moveUFOs } from "./enemyUFO.js"
import { createRandomEnemyShip, moveEnemyShips } from "./enemyShip.js"
import { createRandomSmallMeteor, moveSmallMeteors } from "./enemySmallMeteor.js"
import { createRandomBigMeteor, moveBigMeteors } from "./enemyBigMeteor.js"
import { hud } from "./hud.js" // importando o HUD

import { createShot, moveShots } from "./shot.js"

let gameInterval = null;
let speedIncreaseInterval = null;
let isPaused = false;
let isGameOverState = false;
let gameStarted = false;
let timeUntilNextSpeedIncrease = MINUTO;


function startSpeedIncreaseLogic() {
  increaseSpeed();
  if (speedIncreaseInterval) clearInterval(speedIncreaseInterval);
  timeUntilNextSpeedIncrease = MINUTO;
  speedIncreaseInterval = setInterval(() => {
    if (!isPaused) {
      increaseSpeed();
      timeUntilNextSpeedIncrease = MINUTO;
    }
  }, MINUTO);
}

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  if (speedIncreaseInterval) clearInterval(speedIncreaseInterval);

  ship.reset();
  hud.resetScore();
  hud.updateLivesDisplay(ship.lives);


  isPaused = false;
  isGameOverState = false;
  gameStarted = true;


  const gameOverScreen = document.getElementById('gameOverScreen');
  if (gameOverScreen) gameOverScreen.remove();

  gameInterval = setInterval(run, 1000 / FPS);
  // Inicia o aumento de velocidade após 1 minuto
  setTimeout(startSpeedIncreaseLogic, MINUTO);
}

function gerenciaTeclaEspaco() {
  if (!gameStarted || isGameOverState) {
    startGame();
  } else {
    const shipBottom = parseInt(ship.element.style.bottom);
    const shipLeft = parseInt(ship.element.style.left);
    const shotBase = shipBottom + ship.element.offsetHeight - 8;
    const shotLeft = shipLeft + Math.floor(ship.element.offsetWidth / 2) - 4;

    createShot(shotBase, shotLeft);
  }
}


window.addEventListener("keydown", (e) => {

  if (e.key === "ArrowLeft") ship.changeDirection(-1)
  if (e.key === "ArrowRight") ship.changeDirection(+1)
  if (e.key === "p" || e.key === "P") togglePause()
  if (e.key === " ") gerenciaTeclaEspaco();

})

function togglePause() {
  if (isGameOverState || !gameStarted) return;
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(gameInterval);
  } else {
    gameInterval = setInterval(run, 1000 / FPS);
  }
}

function handleCollision() {
  if (ship.isDamaged) return;

  const isNowGameOver = ship.takeDamage();
  hud.updateLivesDisplay(ship.lives);

  if (isNowGameOver) {
    gameOver();
  }
}

function gameOver() {

  //vamos tentar salvar esse score
  saveScore(hud.score)

  isGameOverState = true;
  gameStarted = false;
  clearInterval(gameInterval);
  if (speedIncreaseInterval) clearInterval(speedIncreaseInterval);

  const gameOverScreen = document.createElement('div');
  gameOverScreen.id = 'gameOverScreen';
  gameOverScreen.style.position = 'absolute';
  gameOverScreen.style.top = '50%';
  gameOverScreen.style.left = '50%';
  gameOverScreen.style.transform = 'translate(-50%, -50%)';
  gameOverScreen.style.backgroundColor = 'rgba(0,0,0,0.7)';
  gameOverScreen.style.color = 'white';
  gameOverScreen.style.padding = '20px';
  gameOverScreen.style.textAlign = 'center';
  gameOverScreen.style.borderRadius = '10px';

  const gameOverText = document.createElement('h2');
  gameOverText.textContent = 'GAME OVER';
  gameOverScreen.appendChild(gameOverText);

  const scoreText = document.createElement('p');
  scoreText.textContent = `Final Score: ${hud.score}`;
  gameOverScreen.appendChild(scoreText);

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart Game';
  restartButton.style.padding = '10px 20px';
  restartButton.style.marginTop = '15px';
  restartButton.style.cursor = 'pointer';
  restartButton.onclick = () => location.reload()
  gameOverScreen.appendChild(restartButton);

  space.element.appendChild(gameOverScreen);
}

function run() {
  if (isPaused || isGameOverState) return;

  space.move();
  ship.move();
  moveShots(); // Mover os tiros a cada frame



  createRandomEnemyShip();

  moveEnemyShips();

  createRandomUFO();

  moveUFOs();

  createRandomSmallMeteor();

  moveSmallMeteors();

  createRandomBigMeteor();

  moveBigMeteors();


  //todos os inimigos, usando espalhamento, muito chique
  const allEnemies = [
    ...(document.querySelectorAll('.enemy-ship-class') || []),
    ...(document.querySelectorAll('.ufo-class') || []),
    ...(document.querySelectorAll('.small-meteor-class') || []),
    ...(document.querySelectorAll('.big-meteor-class') || [])
  ];

  //colisao entre nave e inimigos
  for (const enemyElement of allEnemies) {
    // Basic AABB collision detection (replace with your actual logic)
    const shipRect = ship.element.getBoundingClientRect();
    const enemyRect = enemyElement.getBoundingClientRect();

    if (
      shipRect.left < enemyRect.right &&
      shipRect.right > enemyRect.left &&
      shipRect.top < enemyRect.bottom &&
      shipRect.bottom > enemyRect.top
    ) {
      handleCollision();
      if (isGameOverState) return;
      enemyElement.remove();
      break;
    }
  }

  //colisao entre tiros e inimigos
  const allShots = document.querySelectorAll("#shot")
  for (const enemyElement of allEnemies) {
    for (const shot of allShots) {
      const shotRect = shot.getBoundingClientRect();
      const enemyRect = enemyElement.getBoundingClientRect();

      if (
        shotRect.left < enemyRect.right &&
        shotRect.right > enemyRect.left &&
        shotRect.top < enemyRect.bottom &&
        shotRect.bottom > enemyRect.top
      ) {
        console.log(`Enemy Destroyed! Score: ${enemyElement.dataset.score}`)
        console.log(`Score Before: ${hud.score}`)
        hud.score += parseInt(enemyElement.dataset.score);
        console.log(`Score After: ${hud.score}`)
        hud.updateScore();

        //remover do DOM
        shot.remove();
        enemyElement.remove();
        break;
      }
    }
  }
}

console.log("Press Space to Start Game");
