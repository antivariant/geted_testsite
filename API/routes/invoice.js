const express = require('express');
const router = express.Router();
const invoice = require('../services/invoice');

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         summaWithoutDiscount: 
 *           type: number
 *           description: Documnet amount before disount
 *         discount:
 *           type: number
 *           description: Dicount amount 
 *         summa:
 *           type: number
 *           description: Amount to pay
 *         customerPhone:
 *           type: string
 *           description: Customer phone number 
 *         customerName:
 *           type: string
 *           description: Customer name
 *         comment:
 *           type: string
 *           description: Custormer comment to invoice  
 *         status:
 *           type: integer
 *           description: 0 - по-умолчанию/в процессе заказа, 1 - подтвержден, 2 - выполнен) 
 *       example:
 *         summaWithoutDiscount: 1000
 *         discount: 10
 *         summa: 990
 *         customerPhone: "+380965939833"
 *         customerName: Igor
 *         comment: Some comment from user
 *         status: 1
 *   
*/

/**
 * @swagger
 * tags:
 *  name: Invoices
 *  description: Invoice headers and positions
 *   
 */


/**
 * @swagger
 * /invoice:
 *   get:
 *     summary: The list of all invoices
 *     tags: [Invoices]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: false
 *          description: Page number     
 *     responses:
 *        200:
 *          description: A successful response
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items: 
 *                       $ref: '#/components/schemas/Invoice'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'     
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await invoice.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting invoices `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Adds new invoice.
 *     tags: [Invoices]
 *     requestBody:
 *       description: Invoice head
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */
router.post('/', async function(req, res, next) {
//  console.log(`invoice request body= ${JSON.stringify(req.body)}`)
  try {
      res.json(await invoice.create(req.body));
    } catch (err) {
      console.error(`Error while creating invoice`, err.message);
      next(err);
    }
  });

module.exports = router;
