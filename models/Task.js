const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports.getCompletedTasksWithPriority = (priority) => {
  return Task.find({ completed: true, priority: priority }).exec();
};

module.exports.getTasksWithDescriptionContaining =  (keyword) => {
  return Task.find({ description: { $regex: keyword, $options: 'i' } }).exec();
};

module.exports.deleteTasksOlderThanDays =  (days) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return Task.deleteMany({ createdAt: { $lt: cutoffDate } }).exec();
};


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
