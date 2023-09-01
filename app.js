const playerElement = document.querySelector(".player");
const boardElement = document.querySelector(".game-board");
const scoreElement = document.querySelector(".score");
const bulletArray = [];
const enemyArray = [];
let score = 0;

const movePlayer = (direction) => {
  const newPosition = playerElement.offsetLeft + direction * 10;
  const { left, right } = boardElement.getBoundingClientRect();
  const minLeft = playerElement.offsetWidth / 2;
  const maxRight = right - left - minLeft;

  if (newPosition >= minLeft && newPosition < maxRight) {
    playerElement.style.left = `${newPosition}px`;
  }
};

const createBullet = () => {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.left = `${playerElement.offsetLeft}px`;
  bullet.style.bottom = `${playerElement.offsetHeight}px`;

  boardElement.appendChild(bullet);
  bulletArray.push(bullet);
};
const handleKeyboard = (e) => {
  switch (e.code) {
    case "ArrowLeft":
      movePlayer(-1);
      break;

    case "ArrowRight":
      movePlayer(1);
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

const moveEnemies = () => {
  for (let i = 0; i < enemyArray.length; i++) {
    const enemy = enemyArray[i];
    enemy.style.top = `${enemy.offsetTop + 5}px`;

    if (enemy.offsetTop >= boardElement.offsetHeight) {
      enemyArray.splice(i, 1);
      enemy.remove();
      alert("Game Over");
    }
  }
};

setInterval(moveBullets, 50);
setInterval(moveEnemies, 200);
setInterval(createEnemy, 1000);
