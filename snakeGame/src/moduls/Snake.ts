// 蛇类
class Snake {
  head: HTMLElement;
  // 蛇的身体(包括蛇头)
  bodies: HTMLCollection;
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector("#snake >div") as HTMLElement;
    this.element = document.getElementById("snake")!;
    this.bodies = this.element.getElementsByTagName("div");
  }
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 560) {
      throw new Error("蛇撞墙了");
    }
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value > this.X) {
        value = this.X - 20;
      } else {
        value = this.X + 20;
      }
    }
    this.moveBody();
    this.head.style.left = `${value}px`;
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 560) {
      throw new Error("蛇撞墙了");
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 20;
      } else {
        value = this.Y + 20;
      }
    }
    this.moveBody();
    this.head.style.top = `${value}px`;
    this.checkHeadBody();
  }
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己')
      }
    }
  }
}
export default Snake;
