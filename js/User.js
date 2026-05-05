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

    // return (window.location.href = "../signin.html");

    Swal.fire({
      title: "SweetAlert2 is working!",
      confirmButtonColor: "#3085d6",
    });
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}

const user = new User();
