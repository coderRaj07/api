const express = require('express');
const router = express.Router();
// const {getAllTasks,createTask,getTaskById,deleteTasksOlderThanDays,updateTask,deleteTask,getCompletedTasksWithPriority,getCompletedTasksWithPriority} = require('../controllers/ taskController');
 const TaskController = require('../controllers/taskController');
router.get('/', (req, res) => {
  TaskController.getAllTasks()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/', (req, res) => {
  TaskController.createTask(req.body)
    .then((newTask) => {
      res.status(201).json(newTask);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.get('/:id', (req, res) => {
  TaskController.getTaskById(req.params.id)
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.put('/:id', (req, res) => {
  TaskController.updateTask(req.params.id, req.body)
    .then((updatedTask) => {
      res.json(updatedTask);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.delete('/:id', (req, res) => {
  TaskController.deleteTask(req.params.id)
    .then(() => {
      res.json({ message: 'Task deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Route for getting completed tasks with a specific priority
router.get('/completed/:priority', (req, res) => {
  TaskController.getCompletedTasksWithPriority(req.params.priority)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Route for getting tasks with a description containing a keyword
router.get('/description/:keyword', (req, res) => {
  TaskController.getTasksWithDescriptionContaining(req.params.keyword)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Route for deleting tasks older than a specific number of days
router.delete('/older/:days', (req, res) => {
  TaskController.deleteTasksOlderThanDays(req.params.days)
    .then(() => {
      res.json({ message: 'Tasks deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
