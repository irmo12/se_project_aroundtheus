export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderAll() {
    this._clear();

    this._renderItems.forEach((item) => {
      this.addItem(item);
    });
  }
}
