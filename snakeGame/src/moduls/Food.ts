// 食物类
class Food {
  element: HTMLElement;
  constructor() {
    // !，该值代表一定不为空
    this.element = document.getElementById("food")!;
    this.change();
  }
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }
  change() {
    let top = Math.round(Math.random() * ((560 - 20) / 20)) * 20;
    let left = Math.round(Math.random() * ((560 - 20) / 20)) * 20;

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}
export default Food;
