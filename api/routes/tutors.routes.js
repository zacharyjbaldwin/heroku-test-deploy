const router = require('express').Router();
const controller = require('../controllers/tutors.controller');

router.get('/', controller.getTutors);
router.get('/:tutorId', controller.getTutorById);

module.exports = router;