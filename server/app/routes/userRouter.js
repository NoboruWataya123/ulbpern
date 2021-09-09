const Router = require('express');
const router = Router();
const UserController = require('../controller/userController');
const authMiddleware = require("../middleware/authMiddleware")

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

module.exports = router