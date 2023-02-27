const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.get('/v1/verify', authController.userAuthorization)
router.post('/v1/register', authController.register)
router.post('/v1/login', authController.login)
router.delete('/v1/logout', authController.logout)

module.exports = router