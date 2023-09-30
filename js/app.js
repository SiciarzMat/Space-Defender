const playerElement = document.querySelector(".player");
const boardElement = document.querySelector(".game-board");
const scoreElement = document.querySelector(".score");
const lifesElement = document.querySelector(".lifes");
const gameOverElement = document.querySelector(".end-game");
const restartButton = document.querySelector("#restart");
const newGameElement = document.querySelector(".start-game");
const startButton = document.querySelector("#start");
const bulletArray = [];
const enemyArray = [];
let score = 0;
let lifes = 3;

const movePlayerX = (direction) => {
  const newPosition = playerElement.offsetLeft + direction * 10;
  const { left, right } = boardElement.getBoundingClientRect();
  const minLeft = playerElement.offsetWidth / 2;
  const maxRight = right - left - minLeft;

  if (newPosition >= minLeft && newPosition < maxRight) {
    playerElement.style.left = `${newPosition}px`;
  }
};

const movePlayerY = (direction) => {
  const newPosition = playerElement.offsetTop + direction * 10;
  const { bottom, top } = boardElement.getBoundingClientRect();
  const minTop = 0;
  const maxTop = boardElement.offsetHeight - playerElement.offsetHeight;

  if (newPosition >= minTop && newPosition < maxTop) {
    playerElement.style.top = `${newPosition}px`;
  }
};

const createBullet = () => {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.left = `${playerElement.offsetLeft}px`;
  bullet.style.top = `${playerElement.offsetTop}px`;

  boardElement.appendChild(bullet);
  bulletArray.push(bullet);
};
const handleKeyboard = (e) => {
  switch (e.code) {
    case "ArrowLeft":
      movePlayerX(-1);
      break;

    case "ArrowRight":
      movePlayerX(1);
      break;

    case "ArrowUp":
      movePlayerY(-1);
      break;

    case "ArrowDown":
      movePlayerY(1);
      break;

    case "Space":
      createBullet();
      break;
  }
};
window.addEventListener("keydown", handleKeyboard);

const checkHit = (bullet, enemy) => {
  return (
    bullet.left > enemy.left &&
    bullet.right < enemy.right &&
    bullet.top < enemy.bottom
  );
};

const makeExplosion = (left, top) => {
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  explosion.style.left = `${left}px`;
  explosion.style.top = `${top}px`;

  boardElement.appendChild(explosion);

  setTimeout(() => {
    explosion.remove();
  }, 1000);
};

const addScore = (points = 0) => {
  score += points;
  scoreElement.innerText = score;
};

const showLifes = () => {
  const fillLifes = Array(lifes)
    .fill(0)
    .map((n) => `<div class="life"></div>`)
    .join("");

  lifesElement.innerHTML = fillLifes;
};

checkBulletHit = (bullet) => {
  const position = bullet.getBoundingClientRect();

  for (let i = 0; i < enemyArray.length; i++) {
    const enemy = enemyArray[i];
    const enemyPosition = enemy.getBoundingClientRect();

    if (checkHit(position, enemyPosition)) {
      addScore(1);
      const idHit = bulletArray.indexOf(bullet);
      bulletArray.splice(idHit, 1);
      bullet.remove();

      makeExplosion(enemy.offsetLeft, enemy.offsetTop);

      enemyArray.splice(i, 1);
      enemy.remove();
      break;
    }
  }
};

const moveBullets = () => {
  for (let i = 0; i < bulletArray.length; i++) {
    const bullet = bulletArray[i];

    bullet.style.top = `${bullet.offsetTop - 10}px`;

    if (bullet.offsetTop <= 0) {
      bulletArray.splice(i, 1);
      i--;
      bullet.remove();
    } else {
      checkBulletHit(bullet);
    }
  }
};

const createEnemy = () => {
  const enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.top = -40 + `px`;
  enemy.style.left = `${Math.floor(
    Math.random() * (boardElement.offsetWidth - 120) + 60
  )}px`;

  boardElement.append(enemy);
  enemyArray.push(enemy);
};

const restartGame = () => {
  window.location.reload();
};

let moveEnemiesInterval;
let createEnemyInterval;

const gameOver = () => {
  gameOverElement.style.display = "flex";
  clearInterval(moveEnemiesInterval);
  clearInterval(createEnemyInterval);
  boardElement.style.animation = "none";
};

const moveEnemies = () => {
  for (let i = 0; i < enemyArray.length; i++) {
    const enemy = enemyArray[i];
    enemy.style.top = `${enemy.offsetTop + 5}px`;

    if (enemy.offsetTop >= boardElement.offsetHeight) {
      lifes--;
      showLifes();
      enemyArray.splice(i, 1);
      enemy.remove();

      if (lifes === 0) {
        gameOver();
      }
    }
  }
};

const startGame = () => {
  boardElement.style.animation = "moveBg 1s infinite linear";
  newGameElement.style.display = "none";
  setInterval(moveBullets, 50);
  moveEnemiesInterval = setInterval(moveEnemies, 200);
  createEnemyInterval = setInterval(createEnemy, 1000);

  showLifes();
};

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
