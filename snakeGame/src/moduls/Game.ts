import Food from "./Food";
import Panel from "./Panel";
import Snake from "./Snake";

// 游戏控制器，控制其他的所有类
class GameControl {
  snake: Snake;
  food: Food;
  panel: Panel;
  direction: string = "Right";
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.panel = new Panel();
    this.init();
  }
  init() {
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }
  keydownHandler(e: KeyboardEvent) {
    this.direction = e.key;
  }
  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 20;
        break;
      case "ArrowDown":
      case "Down":
        Y += 20;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 20;
        break;
      case "ArrowRight":
      case "Right":
        X += 20;
        break;
    }
    this.checkEat(X, Y);
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
    }
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.panel.level - 1) * 30);
  }
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.panel.addScore();
      this.snake.addBody();
    }
  }
}
export default GameControl;
