export default class UserInfo {
  constructor(data) {
    this._nameSelector = data.nameSelector;
    this._jobSelector = data.jobSelector;
    this._nameNode = document.querySelector(`${this._nameSelector}`);
    this._jobNode = document.querySelector(`${this._jobSelector}`);
    this._pictureNode = document.querySelector(".profile__picture");
    this.id = data._id;
    this._avatar = data.avatar;
  }

  getUserInfo() {
    this._name = this._nameNode.textContent;
    this._job = this._jobNode.textContent;

    return { name: this._name, about: this._job };
  }

  setUserInfo(newData) {
    this._nameNode.textContent = newData.name;
    this._jobNode.textContent = newData.about;
    this.id = newData._id;
    this.setUserAvatar(newData.avatar);
  }

  getUserAvatar() {
    return this._avatar;
  }

  setUserAvatar(avatar) {
    this._pictureNode.src = avatar;
  }
}
