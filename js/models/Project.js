// Mengurus Bussiness Logic
// Mengelola data seperti CRUD

export default class Project {
  constructor() {
    this.projects = this.getProjects();
  }

  saveData(projectData) {
    const newProject = {
      id: Date.now(),
      ...projectData,
    };

    this.projects.push(newProject);
    this.updateLocalStorage();

    return {
      success: true,
    };
  }

  deleteProject(projectId) {
    const index = this.projects.findIndex((project) => project.id === projectId);

    if (index !== -1) {
      this.projects.splice(index, 1);
      this.updateLocalStorage();

      return {
        success: true,
      };
    }

    return { success: false, message: "Project not found" };
  }

  updateLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  getProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
  }

  getProjectsByUserId(userId, sortOrder = "DESC") {
    const userProject = this.getProjects().filter((project) => project.userId === userId);

    return userProject.sort((a, b) => {
      if (sortOrder === "ASC") {
        return a.created_at.localeCompare(b.created_at);
      } else {
        return b.created_at.localeCompare(a.created_at);
      }
    });
  }

  getProjectsWithTaskCount(userId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const projects = this.getProjectsByUserId(userId);

    return projects.map((project) => {
      const taskCount = tasks.filter((task) => Number(task.projectId) === project.id).length;

      return {
        ...project,
        taskCount: taskCount,
      };
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || [];
  }
}
