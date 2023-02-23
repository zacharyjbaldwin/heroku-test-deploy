const router = require('express').Router();
const controller = require('../controllers/tutors.controller');
const { check } = require('express-validator');

router.get('/', controller.getTutors);

router.get('/:tutorId', controller.getTutorById);

router.post('/', 
    [
        check('firstName').notEmpty(),
        check('lastName').notEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('aboutMe').notEmpty(),
        check('skills').notEmpty(),
        check('availability').notEmpty()
    ],
    controller.createTutor);

router.patch('/:tutorId', controller.updateTutor);

router.delete('/:tutorId', controller.deleteTutor);

module.exports = router;