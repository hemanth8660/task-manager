const express = require('express');
const router = express.Router();
const taskApi = require('../controllers/taskApi');

// specify generic endpoints first then general endpoints - params and query params endpoints should be declared after generic endpoints
router.route('/tasks').post(taskApi.createTask);
router.route('/tasks/priority/:level').get(taskApi.getTasksByPriority);
router.route('/tasks/:id').get(taskApi.getTaskById);
router.route('/tasks').get(taskApi.getAllTasks);
router.route('/filterTask').get(taskApi.getTask);
router.route('/tasks/priority').put(taskApi.setPriority);
router.route('/tasks/:id').put(taskApi.updateTask);
router.route('/tasks/:id').delete(taskApi.deleteTask);

module.exports = router;