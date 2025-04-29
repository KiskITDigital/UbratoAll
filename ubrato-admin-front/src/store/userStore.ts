import { makeAutoObservable, makeObservable, observable } from "mobx"

export type User = {
  login: string
}

class UserStore {
  login = ""

  constructor() {
    makeAutoObservable(this, {
      login: observable
    })
  }

  setUser(login: string) {
    this.login = login;
  }
}

export default new UserStore();