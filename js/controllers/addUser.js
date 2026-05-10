// Penghubung antara UI dan model User

document.addEventListener("DOMContentLoaded", () => {
  const formAddUser = document.getElementById("userForm");
  const userManager = new User();
  formAddUser.addEventListener("submit", (event) => {
    event.preventDefault();

    const userData = {
      username: formAddUser.querySelector("#username").value,
    };

    const result = userManager.saveUser(userData);

    if (result.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `{${result.username}} successfully saved!`,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          return (window.location.href = "../signin.html");
        }
      });
    } else {
      Swal.fire({
        title: `Error!`,
        icon: "error",
      });
    }
  });
});
