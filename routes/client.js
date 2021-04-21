const express = require('express');
const router = express.Router();
//const advancedResults = require('../middlewares/resultatAvancerUser');
//const Client = require('../models/User');
const clientCtrl = require('../controllers/client');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: user firstname
 *         lastName:
 *           type: string
 *           description: user lastname
 *         email:
 *           type: string
 *           description: user email
 *         phone:
 *           type: string
 *           description: user phone
 *       example:
 *         id: d5fE_asz
 *         firstName: Mouhamed Salah
 *         lastName: naija
 *         email: naija963@gmail.com
 *         phone: +216 99 404 229
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The Client API
 */

/**
 * @swagger
 * /api/client:
 *   get:
 *     summary: Returns the list of all client
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of the client
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#'
 */


router.get('/',clientCtrl.getall);

/**
 * @swagger
 * /api/client/{id}:
 *   get:
 *     summary: Get the Client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client information by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#'
 *       404:
 *         description: The client was not found
 */
router.get('/:id',clientCtrl.getone);

module.exports = router;