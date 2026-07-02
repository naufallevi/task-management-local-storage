// Mengurus Business Logic
// Mengelola data seperti CRUD

class User {
  constructor() {
    this.users = this.getUsers();
  }

  registerUser(userData) {
    // Proses pemeriksaan data username pada localstorage
    const existingUser = this.users.some((user) => user.username.toLowerCase() === userData.username.toLowerCase());

    if (existingUser) {
      return {
        success: false,
        message: `Username ${userData.username} already exists`,
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      ...userData,
      password: CryptoJS.SHA256(userData.password).toString(),
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

    // Proses pengembalian data ke signIn.js (controller)
    if (!existingUser) {
      return {
        success: false,
        message: `Username ${existingUser.username} not found`,
      };
    }

    const hashedInputPassword = CryptoJS.SHA256(userDataByInput.password).toString();
    if (existingUser.password !== hashedInputPassword) {
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

  updateUserProfile(userId, data) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return {
        success: false,
        message: "User not found!",
      };
    }

    const currentUserData = this.users[userIndex];

    // 1. Validasi Username
    if (data.username && data.username.toLowerCase() !== currentUserData.username.toLowerCase()) {
      const isTaken = this.users.some((user) => user.username.toLowerCase() === data.username.toLowerCase());
      if (isTaken) {
        return {
          success: false,
          message: `Username ${data.username} is already in use!`,
        };
      }
    }

    // 2. Validasi Password
    let newPassword = currentUserData.password;

    if (data.password || data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        return {
          success: false,
          message: "Password and Confirm Password do not match!",
        };
      }
      newPassword = CryptoJS.SHA256(data.password).toString();
    }

    // 3. Eksekusi Update
    this.users[userIndex].username = data.username || currentUserData.username;
    this.users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(this.users));

    // Update session currentUser
    const sessionData = JSON.parse(localStorage.getItem("currentUser"));
    if (sessionData) {
      sessionData.username = this.users[userIndex].username;
      localStorage.setItem("currentUser", JSON.stringify(sessionData));
    }

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}
