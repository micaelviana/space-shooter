//config comecou como varios numeros
export const FPS = 100;

const BASE_TAMX = 400;
const BASE_TAMY = 550;
const GAME_RATIO = BASE_TAMX / BASE_TAMY;
const GAME_MARGIN = 24;
const MIN_GAME_HEIGHT = 260;

const navbarHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

const availableHeight = Math.max(
  MIN_GAME_HEIGHT,
  viewportHeight - navbarHeight - GAME_MARGIN
);
const availableWidth = Math.max(280, viewportWidth - GAME_MARGIN);

const widthByHeight = Math.round(availableHeight * GAME_RATIO);
const gameWidth = Math.min(widthByHeight, availableWidth);
const gameHeight = Math.round(gameWidth / GAME_RATIO);

document.documentElement.style.setProperty("--game-available-height", `${availableHeight}px`);

export const TAMX = gameWidth;
export const TAMY = gameHeight;
export const PROB_ENEMY_SHIP = 0.2 / 100;
export const PROB_ENEMY_UFO = 0.2 / 100;
export const PROB_ENEMY_BIG_METEOR = 0.1 / 100;
export const PROB_ENEMY_SMALL_METEOR = 0.1 / 100;
export const MINUTO = 60000;

//velocidade base
let minSpeed = 1;
let maxSpeed = 2;

let ENEMY_RATE_SPEED = 2; 
//funcao que aumenta a velocidade, 
//no meu caso ele vai somar as bases minima e maxima com o valor do acrescimo
export const increaseSpeed = () => {
    minSpeed += ENEMY_RATE_SPEED;
    maxSpeed += ENEMY_RATE_SPEED;
    console.log(`Velocidade minima: ${minSpeed}`);
    console.log(`Velocidade maxima: ${maxSpeed}`);
};

export const resetSpeed = () => {
    minSpeed = 1;
    maxSpeed = 2;
    console.log(`Velocidade minima: ${minSpeed}`);
    console.log(`Velocidade maxima: ${maxSpeed}`);
};

//gerar um numero entre minimumSpeed e maximumSpeed em um intervalo inclusivo
export const getRandomSpeed = () => {
    const min = minSpeed;
    const max = maxSpeed;
    return Math.random() * (max - min + Number.EPSILON) + min;
};


//resize o jogo
// window.addEventListener('resize', () => {
//   TAMX = window.innerWidth;
//   TAMY = window.innerHeight;
// });
