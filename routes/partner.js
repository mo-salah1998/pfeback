const express = require('express');
const router = express.Router();

const PartnerCtrl = require('../controllers/partner');
/**
 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       required:
 *         - owner
 *         - rating
 *         - partnerName
 *         - email
 *         - phone
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
 *   name: Partner
 *   description: The Partner API
 */
/**
 * @swagger
 * /api/partner:
 *   get:
 *     summary: Returns the list of all partner
 *     tags: [Partner]
 *     responses:
 *       200:
 *         description: The list of the partner
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#'
 */

/**
 * @swagger
 * /api/partner/{id}:
 *   get:
 *     summary: Get the partner by id
 *     tags: [Partner]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Partner id
 *     responses:
 *       200:
 *         description: The Partner information by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#'
 *       404:
 *         description: The Partner was not found
 */

/**
 * @swagger
 * /api/partner/withtype:
 *   get:
 *     summary: Get the partner by category
 *     tags: [Partner]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: The Partner category
 *     responses:
 *       200:
 *         description: The Partners by category
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#'
 *       404:
 *         description: The Partner was not found
 */
router.get('/',PartnerCtrl.getall);
router.get('/withtype',PartnerCtrl.getallWithType);
router.get('/:id',PartnerCtrl.getone);



module.exports = router;