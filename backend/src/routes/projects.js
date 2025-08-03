const router = require('express').Router();
const controller = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.post('/', auth, controller.createProject);
router.get('/', auth, controller.getProjects);
router.post('/:id/invite', auth, controller.inviteMember);

module.exports = router;