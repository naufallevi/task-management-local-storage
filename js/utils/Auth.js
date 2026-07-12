export default class Auth {
  // constructor() {
  //   this.users = this.getUsers();
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || [];
  }

  getUserByCurrentUser(idCurrentUser) {
    return this.getUsers().find((user) => user.id === idCurrentUser);
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  logoutCurrentUser() {
    localStorage.removeItem("currentUser");
  }
}
