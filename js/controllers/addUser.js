import User from "../models/User.js";

document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();

  const formAddUser = document.getElementById("userForm");
  formAddUser.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputUsername = formAddUser.querySelector("#username").value.trim();
    const inputPassword = formAddUser.querySelector("#password").value;

    // Validasi value form
    if (!validateForm(inputUsername, inputPassword)) return;

    const userData = {
      username: inputUsername,
      password: inputPassword,
      created_at: nowTime(),
    };

    const result = userManager.registerUser(userData);

    if (result.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${result.username} successfully saved!`,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../signin.html";
        }
      });
    } else {
      Swal.fire({
        title: `Error!`,
        icon: "error",
        text: result.message,
      });
    }
  });

  function validateForm(username, password) {
    if (!username) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please enter the username!",
      });
      return false;
    }

    if (username.length < 3) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Username must be at least 3 characters long!",
      });
      return false;
    }

    if (!password) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please enter the password!",
      });
      return false;
    }

    if (password.length < 8) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Password must be at least 8 characters long!",
      });
      return false;
    }

    return true;
  }

  function nowTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, 0);
    const day = String(now.getDate()).padStart(2, 0);
    const hour = String(now.getHours()).padStart(2, 0);
    const minute = String(now.getMinutes()).padStart(2, 0);
    const second = String(now.getSeconds()).padStart(2, 0);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
});
