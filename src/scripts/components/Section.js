export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderAll() {
    this._clear();

    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
