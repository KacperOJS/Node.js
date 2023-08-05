const express = require('express')
const router = express.Router();
const {getAllTasks}=require('../controllers/tasks')
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks)
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
