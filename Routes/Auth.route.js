const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

/**
 * @swagger
 * /v1/verify:
 *   put:
 *     summary: User Authorization.
 *     description: User Authorization.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error
 */
router.get('/v1/verify', authController.userAuthorization)

/**
 * @swagger
 * /v1/verify:
 *   put:
 *     summary: User Authorization.
 *     description: User Authorization.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error
 */
router.post('/v1/register', authController.register)

/**
 * @swagger
 * /v1/verify:
 *   put:
 *     summary: User Authorization.
 *     description: User Authorization.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error
 */
router.post('/v1/login', authController.login)

/**
 * @swagger
 * /v1/verify:
 *   put:
 *     summary: User Authorization.
 *     description: User Authorization.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error
 */
router.delete('/v1/logout', authController.logout)

module.exports = router