import User from "../models/User.js";

document.addEventListener("DOMContentLoaded", () => {
  const userManager = new User();

  const formSignIn = document.getElementById("userForm");
  formSignIn.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameByInput = formSignIn.querySelector("#username").value.trim();
    const passwordByInput = formSignIn.querySelector("#password").value;

    // Validasi value form
    if (!validateForm(usernameByInput, passwordByInput)) return;

    const userDataByInput = {
      username: usernameByInput,
      password: passwordByInput,
    };

    const result = userManager.signInUser(userDataByInput);

    if (result.success) {
      Swal.fire({
        title: `Login`,
        icon: "success",
        text: `${result.username} successful login`,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          return (window.location.href = "../tasks.html");
        }
      });
    } else {
      Swal.fire({
        title: `Error!`,
        icon: "error",
        text: `${result.message}`,
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

    if (!password) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please enter the password!",
      });
      return false;
    }

    return true;
  }
});
