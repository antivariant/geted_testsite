const express = require('express');
const router = express.Router();
const invoiceDetails = require('../services/invoiceDetails');

/**
 * @swagger
 * components:
 *   schemas:
 *      InvoiceLine:
 *        type: object
 *        properties:
 *          invoiceId:
 *            type: integer
 *            description: ID замовлення
 *          videoId:
 *            type: integer
 *            description: ID відео
 *          summa:
 *            type: decimal
 *            description: Ціна фільму
 *        example:
 *          invoiceId: 1
 *          videoId: 438488
 *          summa: "1000.00"
 *            
 */


/**
 * @swagger
 * /invoice-details:
 *   get:
 *     summary: Строки замовлення
 *     tags: [Invoices]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: invoiceId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:    
 *          200:
 *            description: Успішний запит
 *            content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items: 
 *                       $ref: '#/components/schemas/InvoiceLine'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'                 
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await invoiceDetails.getMultiple(req.query.page, req.query.invoiceId));
  } catch (err) {
    console.error(`Error while getting invoice details `, err.message);
    next(err);
  }
});



/**
 * @swagger
 * /invoice-details:
 *   post:
 *     summary: Додає строку до замовлення
 *     tags: [Invoices]
 *     requestBody:
 *       descriptions: Строка змовлення 
 *       required: true
 *       content:
 *         application/javascript:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceLine'
 *     responses:
 *       200:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *                properties:              
 *                  message:
 *                    type: string
 *                    example: Invoice created successfully
 *        
 */
router.post('/', async function(req, res, next) {
    try {
      res.json(await invoiceDetails.create(req.body));
    } catch (err) {
      console.error(`Error while adding invoice lines`, err.message);
      next(err);
    }
  });

module.exports = router;
