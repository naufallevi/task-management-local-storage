// Mengurus Bussiness Logic
// Mengelola data seperti CRUD

class Task {
  constructor() {
    this.tasks = this.getTasks();
  }

  saveData(taskData) {
    const newTask = {
      id: Date.now(),
      isCompleted: false,
      ...taskData,
    };

    this.tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));

    return {
      success: true,
    };
  }

  completeTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      this.tasks[index].isCompleted = true;
      this.updateLocalStorage();
    }
  }

  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      // this.tasks[index].isCompleted = true;
      this.tasks.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }
}
