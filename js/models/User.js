// Mengurus Business Logic
// Mengelola data seperti CRUD

class User {
  constructor() {
    this.users = this.getUsers();
  }

  registerUser(userData) {
    // Proses pemeriksaan data username pada localstorage
    const existingUser = this.users.some(
      (user) => user.username.toLowerCase() === userData.username.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message: `Username ${userData.username} already exists`,
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
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

  signInUser(userDataByInput) {
    // Proses pemeriksaan data username pada localstorage
    const existingUser = this.users.find(
      (user) => user.username.toLowerCase() === userDataByInput.username.toLowerCase(),
    );

    console.info(existingUser);

    // Proses pengembalian data ke signIn.js (controller)
    if (!existingUser) {
      return {
        success: false,
        message: `Username ${userDataByInput.username} not found`,
      };
    }

    if (existingUser.password !== userDataByInput.password) {
      return {
        success: false,
        message: "Incorrect password! Please try again",
      };
    }

      const currentUserData = {
        id: existingUser.id,
        username: existingUser.username,
      };

      localStorage.setItem("currentUser", JSON.stringify(currentUserData));

      return {
        success: true,
        username: userDataByInput.username,
      };
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}
