import { makeAutoObservable } from "mobx";

class AuthStore {
  isAuth: boolean = false;
  // need to be false by default

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(auth: boolean) {
    this.isAuth = auth;
  }
}

export default new AuthStore();