const { check } = require('express-validator');
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const controller = require('../controllers/helloworld.controller');



router.post('/',
    authController.register);

//router.post('/', authController.register);
module.exports = router;