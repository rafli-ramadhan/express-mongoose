const express = require('express')
const router = express.Router()
const accountController = require('../controllers/account.controller')

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get Users.
 *     description: Get users.
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *       500:
 *         description: Internal server error
 */
router.get('/v1/users', accountController.GetAll);

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Get User.
 *     description: Get user.
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.get('/v1/users/:id', accountController.Get);

/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     summary: Update User.
 *     description: Update user.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error
 */
router.put('/v1/users/:id', accountController.Update);

/**
 * @swagger
 * /v1/users:
 *   delete:
 *     summary: Delete User By Id.
 *     description: Delete user by id.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error

 */
router.delete('/v1/users/:id', accountController.Delete);

/**
 * @swagger
 * /v1/users:
 *   delete:
 *     summary: Delete All User.
 *     description: Delete all user.
 *     responses:
 *       200:
 *         description: Success. 
 *       500:
 *         description: Internal server error
 */
router.delete('/v1/users/', accountController.DeleteAll);

module.exports = router