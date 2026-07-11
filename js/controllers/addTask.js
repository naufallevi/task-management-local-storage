// Penghubung antara UI dan model Task

document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new Task();
  const projectManager = new Project();
  const auth = new Auth();
  const currentUser = auth.getCurrentUser();

  // START Add to Project
  const projectListContainer = document.getElementById("projectListContainer");
  const userProjects = projectManager.getProjectsWithTaskCount(currentUser.id);

  if (projectListContainer) {
    if (userProjects.length === 0) {
      // console.info("Data kosong");
      projectListContainer.innerHTML = `
<div class="p-4 border-4 border-darker-slate text-center">
  <p class="font-semibold text-slate-500">No projects available</p>
  <p class="text-sm text-slate-400">Create a project first in Manage Project page</p>
</div>
      `;
    } else {
      // console.info("Data berisi");
      const fragment = document.createDocumentFragment();

      userProjects.forEach((project, index) => {
        const projectItem = document.createElement("label");
        projectItem.setAttribute("for", `project-${project.id}`);
        projectItem.className = "group relative";
        const isChecked = index === 0 ? "checked" : "";

        projectItem.innerHTML = `
<div
  class="flex items-center gap-3 p-4 border-4 border-darker-slate group-has-checked:border-lotask-blue group-has-checked:ring-2 group-has-checked:ring-lotask-blue"
>
  <div class="w-12.5 h-12.5 flex shrink-0 items-center justify-center">
    <i class="fa-solid fa-diagram-project fa-xl"></i>
  </div>
  <div class="flex flex-col justify-center">
    <p class="font-bold text-lg leading-6.75">${capitalizeFirstChar(project.projectName)}</p>
    <p class="text-sm leading-5.25 text-taskia-grey">${project.taskCount} tasks</p>
  </div>
</div>
<input
  id="project-${project.id}"
  name="project"
  type="radio"
  value="${project.id}"
  class="absolute bottom-0 left-1/2 -z-10"
  ${isChecked}
/>
        `;
        fragment.appendChild(projectItem);
      });
      projectListContainer.appendChild(fragment);
    }
  }
  // END Add to Project

  const formAddTask = document.getElementById("taskForm");
  formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedProject = document.querySelector('input[name="project"]:checked');
    const projectId = selectedProject ? selectedProject.value : "";

    const taskData = {
      taskName: document.querySelector("#taskName").value,
      taskPriority: document.querySelector("#taskPriority").value,
      projectId: projectId,
      userId: currentUser.id,
      created_at: nowTime(),
      isCompleted_at: null,
    };

    const result = taskManager.saveData(taskData);
    formAddTask.reset();

    if (result.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `Successfully added!`,
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
      });
    }
  });

  function capitalizeFirstChar(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
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
