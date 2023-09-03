const {getCompletedTasksWithPriority,getTasksWithDescriptionContaining,deleteTasksOlderThanDays} = require('../models/Task');
const Task = require('../models/Task');
module.exports.getAllTasks = () => {
  return new Promise((resolve, reject) => {
    Task.find()
      .then((tasks) => {
        resolve(tasks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.createTask = (taskData) => {
  return new Promise((resolve, reject) => {
    const task = new Task(taskData);
    task.save()
      .then((newTask) => {
        resolve(newTask);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.getTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
    Task.findById(taskId)
      .then((task) => {
        if (!task) {
          const error = { message: 'Task not found' };
          reject(error);
        } else {
          resolve(task);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.updateTask = (taskId, taskData) => {
  return new Promise((resolve, reject) => {
    Task.findById(taskId)
      .then((task) => {
        if (!task) {
          const error = { message: 'Task not found' };
          reject(error);
        } else {
          task.title = taskData.title || task.title;
          task.description = taskData.description || task.description;
          task.completed = taskData.completed || task.completed;
          task.save()
            .then((updatedTask) => {
              resolve(updatedTask);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.deleteTask = (taskId) => {
  return new Promise((resolve, reject) => {
    Task.findByIdAndDelete(taskId)
      .then((task) => {
        if (!task) {
          const error = { message: 'Task not found' };
          reject(error);
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.getCompletedTasksWithPriority = (priority) => {
  return new Promise((resolve, reject) => {
    getCompletedTasksWithPriority(priority)
      .then((tasks) => {
        resolve(tasks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.getTasksWithDescriptionContaining = (keyword) => {
  return new Promise((resolve, reject) => {
    getTasksWithDescriptionContaining(keyword)
      .then((tasks) => {
        resolve(tasks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports.deleteTasksOlderThanDays = (days) => {
  return new Promise((resolve, reject) => {
   deleteTasksOlderThanDays(days)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
