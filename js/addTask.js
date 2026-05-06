// Penghubung antara UI dan model Task

document.addEventListener("DOMContentLoaded", () => {
  const formAddTask = document.getElementById("taskForm");
  const taskManager = new Task();

  formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskData = {
      taskName: document.querySelector("#taskName").value,
      taskPriority: document.querySelector("#taskPriority").value,
    };

    const result = taskManager.saveData(taskData);

    if (result.success) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `Successfully added!`,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // return (window.location.href = "../tasks.html");
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
