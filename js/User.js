// Mengurus Bussiness Logic
// Mengelola data seperti CRUD

class User {
  constructor() {
    this.users = this.getUsers() || [];
  }

  saveUser(userData) {
    const newUser = {
      id: Date.now(),
      ...userData,
    };

    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));

    // Proses pengembalian data ke addUser.js (controller)
    return {
      success: true,
      username: newUser.username,
    };
  }

  signInUser(usernameByInput) {
    // Proses pemeriksaan data username pada localstorage
    const userExist = this.users.some((user) => user.username.toLowerCase() === usernameByInput.toLowerCase());
    console.info(userExist);
    // Proses pengembalian data ke signIn.js (controller)
    if (userExist) {
      localStorage.setItem("isLoggedIn", usernameByInput)
      return {
        success: true,
        usernameByInput,
      };
    } else {
      return {
        success: false,
        message: `Username {${usernameByInput}} is not available`,
      };
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}

const user = new User();
