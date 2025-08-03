const router = require('express').Router();
const controller = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createTask);
router.get('/:projectId', auth, controller.getTasks);
router.patch('/:id', auth, controller.updateTask);

module.exports = router;