export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderAll(items) {
    this._clear();
    items.forEach((item) => {
      this.addItem(item);
    });
  }
}
