// Penghubung antara UI dan model User

document.addEventListener("DOMContentLoaded", () => {
  const formAddUser = document.getElementById("userForm");
  const userManager = new User();

  formAddUser.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputUsername = formAddUser.querySelector("#username").value.trim();
    const inputPassword = formAddUser.querySelector("#password").value;

    if (!validateForm(inputUsername, inputPassword)) {
      return;
    }

    const hashedPassword = CryptoJS.SHA256(inputPassword).toString();

    const userData = {
      username: inputUsername,
      password: hashedPassword,
      created_at: nowTime(),
    };

    const result = userManager.saveUser(userData);

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
