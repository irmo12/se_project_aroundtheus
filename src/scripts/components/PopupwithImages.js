const TITLE_FIELD_SELECTOR = ".popup-edit__field_place-title";
  const LINK_FIELD_SELECTOR = ".popup-edit__field_place-link";

export default class PopupWithImages extends Popup {
    constructor(selector,source,title) {
        super(selector)
        this._source = source;
        this._title = title;
    }

    open() {
        const image = this._modal.querySelector('img-popout__img');
        const caption =this._modal.querySelector('img-popout__caption');
        
        image.src = this._source;
        image.alt = this._title;
        caption.textContent = this._title;
        super.open();
    }
}