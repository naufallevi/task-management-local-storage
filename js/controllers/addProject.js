import Project from "../models/Project.js";
import Auth from "../utils/Auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const projectManager = new Project();
  const auth = new Auth();
  const currentUser = auth.getCurrentUser();

  const formAddProject = document.getElementById("projectForm");

  formAddProject.addEventListener("submit", (event) => {
    event.preventDefault();

    const projectData = {
      projectName: document.querySelector("#projectName").value,
      userId: currentUser.id,
      created_at: nowTime(),
    };

    const result = projectManager.saveData(projectData);
    formAddProject.reset();

    if (result.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `Successfully added!`,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          return (window.location.href = "../projects.html");
        }
      });
    } else {
      Swal.fire({
        title: `Error!`,
        icon: "error",
      });
    }
  });

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
