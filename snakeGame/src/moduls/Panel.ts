// 记分牌类
class Panel {
  score = 0;
  level = 1;
  maxLevel: number;
  upScore: number;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }
  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}
export default Panel;
