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

    Swal.fire({
      title: "Saved!",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        return (window.location.href = "../signin.html");
      }
    });
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}

const user = new User();
