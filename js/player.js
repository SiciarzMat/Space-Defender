export default class Player {
  constructor(settings) {
    this.lifes = settings.lifes || 3;
    this.score = 0;
    this.element = settings.element;
    this.boardElement = settings.boardElement;
  }

  getLifes() {
    return this.lifes;
  }

  setLifes(number) {
    this.lifes = number;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  addScore(score) {
    this.score += score;
  }

  moveX(direction) {
    const newPosition = this.element.offsetLeft + direction * 10;
    const { left, right } = this.boardElement.getBoundingClientRect();
    const minLeft = this.element.offsetWidth / 2;
    const maxRight = right - left - minLeft;

    if (newPosition >= minLeft && newPosition < maxRight) {
      this.element.style.left = `${newPosition}px`;
    }
  }

  moveY(direction) {
    const newPosition = this.element.offsetTop + direction * 10;
    const { bottom, top } = this.boardElement.getBoundingClientRect();
    const minTop = 0;
    const maxTop = this.boardElement.offsetHeight - this.element.offsetHeight;

    if (newPosition >= minTop && newPosition < maxTop) {
      this.element.style.top = `${newPosition}px`;
    }
  }
}
