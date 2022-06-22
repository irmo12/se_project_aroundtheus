export default class UserInfo {
    constructor(data) {
        this._nameSelector = data.nameSelector;
        this._jobSelector = data.jobSelector;
    }

    getUserInfo() {
        this._name = document.querySelector(`${this._nameSelector}`).textContent;
        this._job = document.querySelector(`${this._jobSelector}`).textContent;
        
        return {name: this._name, job: this._job};
    }

    setUserInfo(newData) {
        this._name.textContent = newData.name;
        this._job.textContent = newData.job;
    }
}