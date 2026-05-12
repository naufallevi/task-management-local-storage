// Penghubung antara UI dan model User

document.addEventListener("DOMContentLoaded", () => {
  const formAddUser = document.getElementById("userForm");
  const userManager = new User();

  formAddUser.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputUsername = formAddUser.querySelector("#username").value.trim();

    if (!inputUsername) {
      return Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Please enter the correct username!",
      });
    }

    const userData = {
      username: inputUsername,
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
});
