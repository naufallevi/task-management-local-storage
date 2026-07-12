// Mengurus Bussiness Logic
// Mengelola data seperti CRUD

export default class Task {
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

      return {
        success: true,
      };
    }

    return { success: false, message: "Task not found" };
  }

  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      // this.tasks[index].isCompleted = true;
      this.tasks.splice(index, 1);
      this.updateLocalStorage();

      return {
        success: true,
      };
    }

    return { success: false, message: "Task not found" };
  }

  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  getTasksByUserId(userId, sortOrder = "DESC") {
    const userTask = this.getTasks().filter((task) => task.userId === userId);

    return userTask.sort((a, b) => {
      if (sortOrder === "ASC") {
        return a.created_at.localeCompare(b.created_at);
      } else {
        return b.created_at.localeCompare(a.created_at);
      }
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || [];
  }
}
