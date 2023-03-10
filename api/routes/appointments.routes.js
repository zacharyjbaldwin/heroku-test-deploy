const router = require('express').Router();
const controller = require('../controllers/appointments.controller');
const { check } = require('express-validator');
const authCheck = require('../middleware/check-auth');

router.get('/', authCheck, controller.getAppointments);

router.get('/:appointmentId', authCheck, controller.getAppointmentById);
/*
// do not use this route for tutor signup
router.post('/', 
    [
        check('firstName').notEmpty(),
        check('lastName').notEmpty(),
        // check('aboutMe').notEmpty(),
        check('skills').notEmpty(),
        check('availability').notEmpty()
    ],
    controller.createTutor);

router.patch('/:appointmentId', authCheck, controller.updateTutor);

router.delete('/:appointmentId', authCheck, controller.deleteTutor);
*/
module.exports = router;