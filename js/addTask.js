// Penghubung antara UI dan model Task

document.addEventListener("DOMContentLoaded", () => {
  const formAddTask = document.getElementById("taskForm");
  const taskManager = new Task();

  formAddTask.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskData = {
      taskName: document.querySelector("#taskName").value,
      taskPriority: document.querySelector("#taskPriority").value,
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
