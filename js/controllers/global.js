import Auth from "../utils/Auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const auth = new Auth();
  const currentUser = auth.getCurrentUser();

  if (!currentUser || (Array.isArray(currentUser) && currentUser.length === 0)) {
    window.location.href = "signin.html";
    return;
  }

  const profileNameEl = document.getElementById("profileName");
  if (profileNameEl && currentUser.username) profileNameEl.innerText = currentUser.username || "Guest";

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();

      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Logout Confirmation",
          text: "Are you sure you want to log out of this account?",
          icon: "warning",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            auth.logoutCurrentUser();
            window.location.href = "signin.html";
          }
        });
      } else {
        // CDN SweetAlert gagal dimuat
        if (confirm("Are you sure you want to log out of this account?")) {
          auth.logoutCurrentUser();
          window.location.href = "signin.html";
        }
      }
    });
  }
});
