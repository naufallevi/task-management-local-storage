// Penghubung antara UI dan model User

document.addEventListener("DOMContentLoaded", () => {

  const formAddUser = document.getElementById("userForm");
  const userManager = new User()
  formAddUser.addEventListener("submit", event => {
    event.preventDefault()

    const userData = {
      username: formAddUser.querySelector("#username").value,
    }

    userManager.saveUser(userData)
    console.info("Data berhasil ter submit")
  })
});

