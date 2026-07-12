import Project from "../models/Project.js";
import Auth from "../utils/Auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // Membuat instance dari object Project
  const myProjects = new Project();
  const auth = new Auth();
  const currentUser = auth.getCurrentUser();

  // Membuat variable untuk mengambil projects
  let existingProjects = myProjects.getProjectsByUserId(currentUser.id);

  // START Search Project
  const searchProjectInput = document.getElementById("searchProject");

  if (searchProjectInput) {
    searchProjectInput.addEventListener("input", (event) => {
      const valueSearchProject = event.target.value.toLowerCase().trim();
      const filteredProject = existingProjects.filter((project) =>
        project.projectName.toLowerCase().includes(valueSearchProject),
      );

      displayAllProjects(filteredProject);
    });
  }
  // END Search Project

  const projectWrapper = document.getElementById("projectWrapper");
  const projectWrapperEmpty = document.getElementById("projectWrapperEmpty");

  // START Delete Project
  projectWrapper.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest('[id^="deleteProject-"]');
    if (!deleteBtn) return;

    if (deleteBtn) {
      event.preventDefault();
      const projectId = Number(deleteBtn.dataset.id);

      Swal.fire({
        title: "Are you sure?",
        text: "Deleted projects cannot be restored!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteResult = myProjects.deleteProject(projectId);

          if (deleteResult.success) {
            // existingProjects.length = 0;
            // existingProjects.push(...updateData);
            // displayAllProjects(existingProjects);

            existingProjects = myProjects.getProjectsByUserId(currentUser.id);
            if (searchProjectInput) searchProjectInput.value = "";
            displayAllProjects(existingProjects);

            Swal.fire("Deleted!", "Project successfully deleted.", "success");
          } else {
            Swal.fire("Failed!", deleteResult.message || "An error occurred while deleting.", "error");
          }
        }
      });
    }
  });
  // END Delete Project

  function displayAllProjects(projects = existingProjects) {
    if (projects.length === 0) {
      // console.info("Data kosong");
      projectWrapper.classList.add("hidden");
      projectWrapperEmpty.classList.remove("hidden");
    } else {
      // console.info("Data ada dan siap ditampilkan");
      projectWrapper.classList.remove("hidden");
      projectWrapperEmpty.classList.add("hidden");
      projectWrapper.innerHTML = "";

      const fragment = document.createDocumentFragment();

      projects.forEach((project) => {
        const userFriendlyDate = formatDate(project.created_at);
        const itemProject = document.createElement("div");
        itemProject.innerHTML = createItemProjectHTML(project, userFriendlyDate);
        fragment.appendChild(itemProject);
      });
      projectWrapper.appendChild(fragment);
    }
  }

  function createItemProjectHTML(project, userFriendlyDate) {
    return `
<div class="flex flex-col md:flex-row justify-between bg-lotask-white p-4 md:p-6 w-full border-2 border-darken-slate shadow-c-lg items-start md:items-center gap-4 md:gap-6">
    <div class="project-card flex flex-col gap-3 md:gap-4 w-full">
        <div class="flex gap-3 md:gap-4 items-start md:items-center">
            <div class="w-12 h-12 md:w-14 md:h-14 flex shrink-0 items-center justify-center bg-lotask-green border-2 border-darken-slate shadow-c-xs mt-1 md:mt-0">
                <i class="fa-solid fa-diagram-project fa-xl"></i>
            </div>
            <div class="flex flex-col">
                <p class="font-extrabold text-xl md:text-2xl text-dark-slate tracking-wide wrap-break-word">${capitalizeFirstChar(project.projectName)}</p>
                <p class="text-xs md:text-sm font-bold text-dark-slate/60 mt-0.5">Created at ${userFriendlyDate}</p>
            </div>
        </div>
    </div>

    <div class="flex flex-row items-center w-full md:w-auto gap-3 md:gap-x-4 shrink-0 mt-2 md:mt-0">
        <a href="#" id="deleteProject-${project.id}" data-id="${project.id}"
            class="flex-1 md:flex-none justify-center flex items-center font-extrabold text-dark-slate bg-[#FF6B6B] border-2 border-darken-slate px-4 md:px-6 h-10 md:h-12 text-sm md:text-base shadow-c-xs hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none uppercase tracking-wide smooth-transition-150">Delete</a>
    </div>
</div>
    `;
  }

  function capitalizeFirstChar(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "numeric",
      second: "numeric",
    };

    // return date.toLocaleString("id-ID", options);
    return date.toLocaleString("en-US", options);
  }

  displayAllProjects();
});
