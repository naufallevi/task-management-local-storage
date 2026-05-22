document.addEventListener("DOMContentLoaded", () => {
  // Membuat instance dari object Task
  const myTasks = new Task();
  // Membuat variableuntuk mengambil tasks
  const existingTasks = myTasks.getTasks();
  // console.info(existingTasks);

  const taskWrapper = document.getElementById("taskWrapper");
  const taskWrapperEmpty = document.getElementById("taskWrapperEmpty");

  const profileName = document.getElementById("profileName");
  const userProfileData = JSON.parse(localStorage.getItem("currentUser")) || [];
  profileName.innerText = userProfileData.username;

  function displayAllTasks(tasks = existingTasks) {
    if (tasks.length === 0) {
      console.info("Data kosong");
      taskWrapper.className = "hidden";
      taskWrapperEmpty.className = "flex justify-center items-center h-[420px] mx-auto";
    } else {
      taskWrapper.innerHTML = "";
      console.info("Data ada dan siap ditampilkan");
      taskWrapperEmpty.className = "hidden";

      tasks.forEach((task) => {
        const userFriendlyDate = formatDate(task.created_at);

        const itemTask = document.createElement("div");
        // itemTask.className = "flex justify-between bg-lotask-white";
        itemTask.innerHTML = createItemTaskHTML(task, userFriendlyDate);
        taskWrapper.appendChild(itemTask);

        itemTask.querySelector(`#completeTask-${task.id}`).addEventListener("click", (event) => {
          event.preventDefault();
          //   console.info(task.id);
          myTasks.completeTask(task.id);

          const updateData = myTasks.getTasks();
          displayAllTasks(updateData);
        });

        itemTask.querySelector(`#deleteTask-${task.id}`).addEventListener("click", (event) => {
          event.preventDefault();
          //   console.info(task.id);
          myTasks.deleteTask(task.id);

          const updateData = myTasks.getTasks();
          displayAllTasks(updateData);
        });
      });
    }
  }

function createItemTaskHTML(task, userFriendlyDate) {
    return `
<div class="flex flex-col md:flex-row justify-between bg-lotask-white p-4 md:p-6 w-full border-2 border-darken-slate shadow-c-lg items-start md:items-center gap-4 md:gap-6">
    <div class="task-card flex flex-col gap-3 md:gap-4 w-full">
        <div class="flex gap-3 md:gap-4 items-start md:items-center">
            <div class="w-12 h-12 md:w-14 md:h-14 flex shrink-0 items-center justify-center bg-lotask-yellow border-2 border-darken-slate shadow-c-xs mt-1 md:mt-0">
                <img src="img/icons/ghost.svg" alt="icon" class="w-6 h-6 md:w-7 md:h-7">
            </div>
            <div class="flex flex-col">
                <p class="font-extrabold text-xl md:text-2xl text-dark-slate tracking-wide wrap-break-word">${capitalizeFirstChar(task.taskName)}</p>
                <p class="text-xs md:text-sm font-bold text-dark-slate/60 mt-0.5">Created at ${userFriendlyDate}</p>
            </div>
        </div>
        
        <div class="flex flex-wrap gap-2 md:gap-3 font-bold text-xs md:text-sm">
            <div class="flex gap-1.5 items-center px-2.5 py-1.5 md:px-3 border-2 border-darken-slate bg-lotask-white shadow-c-xs">
                <div class="flex shrink-0 w-3 h-3 md:w-4 md:h-4">
                    <i class="fa-solid fa-signal"></i>
                </div>
                <p class="uppercase">${task.taskPriority}</p>
            </div>

            ${
              task.isCompleted === false
                ? `
            <div class="flex gap-1.5 items-center px-2.5 py-1.5 md:px-3 border-2 border-darken-slate bg-lotask-orange shadow-c-xs">
                <div class="flex shrink-0 w-3 h-3 md:w-4 md:h-4 text-dark-slate">
                    <i class="fa-solid fa-spinner"></i>
                </div>
                <p class="uppercase text-dark-slate">In Progress</p>
            </div>
            `
                : `
            <div class="flex gap-1.5 items-center px-2.5 py-1.5 md:px-3 border-2 border-darken-slate bg-lotask-green shadow-c-xs">
                <div class="flex shrink-0 w-3 h-3 md:w-4 md:h-4 text-dark-slate">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <p class="uppercase text-dark-slate">Completed</p>
            </div>
            `
            }
        </div>
    </div>

    <div class="flex flex-row items-center w-full md:w-auto gap-3 md:gap-x-4 shrink-0 mt-2 md:mt-0">
        <a href="#" id="deleteTask-${task.id}"
            class="flex-1 md:flex-none justify-center flex items-center font-extrabold text-dark-slate bg-[#FF6B6B] border-2 border-darken-slate px-4 md:px-6 h-10 md:h-12 text-sm md:text-base shadow-c-xs hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none uppercase tracking-wide smooth-transition-150">Delete</a>
        
        ${
          task.isCompleted === false
            ? `
        <a href="#" id="completeTask-${task.id}"
            class="flex-1 md:flex-none justify-center flex items-center text-dark-slate px-4 md:px-6 h-10 md:h-12 text-sm md:text-base font-extrabold bg-lotask-blue border-2 border-darken-slate shadow-c-xs hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none uppercase tracking-wide smooth-transition-150">Complete</a>
            `
            : `
        <a href="#" id="completeTask-${task.id}" class="hidden">Complete</a>
            `
        }
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

  displayAllTasks();
});
