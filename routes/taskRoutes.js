// Task Routes
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const taskController = require('../controllers/taskController');

const router = express.Router();
router.use(verifyToken);
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.delete('/:id', taskController.deleteTask);
module.exports = router;
