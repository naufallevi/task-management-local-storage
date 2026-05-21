// Penghubung antara UI dan model User

document.addEventListener("DOMContentLoaded", () => {
  const formSignIn = document.getElementById("userForm");
  const userManager = new User();
  formSignIn.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameByInput = formSignIn.querySelector("#username").value.trim();
    const passwordByInput = formSignIn.querySelector("#password").value;
    
    // Validasi value form
    if (!validateForm(usernameByInput, passwordByInput)) return;
    
    const hashedPassword = CryptoJS.SHA256(passwordByInput).toString();

    const userDataByInput = {
      username: usernameByInput,
      password: hashedPassword,
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
