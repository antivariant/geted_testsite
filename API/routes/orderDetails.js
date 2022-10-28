const express = require('express');
const router = express.Router();
const orderDetails = require('../services/orderDetails');

/**
 * @swagger
 * components:
 *   schemas:
 *      OrderLine:
 *        type: object
 *        properties:
 *          lineId:
 *            type: integer
 *            description: ID замовлення
 *          productId:
 *            type: integer
 *            description: ID відео
 *          productTitle:
 *            type: string
 *            description: ID відео
 *          productYear:
 *            type: string
 *            description: ID відео
 *          price:
 *            type: decimal
 *            description: ціна
 *          discount:
 *            type: decimal
 *            description: Ціна фільму
 *        example:
 *          lineId: 1
 *          priductId: 438488
 *          productTitle: Terminator Salvation
 *          productYear: 2009 
 *          price: "1000.00"
 *          discount: "10"
 *            
 */


/**
 * @swagger
 * /order-details/{orderId}:
 *   get:
 *     summary: Строки замовлення
 *     tags: [Orders]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: orderId
 *         in: path
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
 *                       $ref: '#/components/schemas/OrderLine'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'                 
 */
router.get('/:orderId', async function(req, res, next) {
  try {
    res.json(await orderDetails.getMultiple(req.query.page, req.params.orderId));
  } catch (err) {
    console.error(`Error while getting order details `, err.message);
    next(err);
  }
});



/**
 * @swagger
 * /order-details:
 *   post:
 *     summary: Додає строку до замовлення
 *     tags: [Orders]
 *     requestBody:
 *       descriptions: Строка замовлення 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               orderId:
 *                 type: integer
 *               videoId:
 *                 type: integer
 *             example:
 *               orderId: 1
 *               videoId: 438488  
 *     responses:
 *       200:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *                properties:              
 *                  message:
 *                    type: string
 *                    example: Order line created successfully
 *        
 */
router.post('/', async function(req, res, next) {
    try {
      res.json(await orderDetails.create(req.body));
    } catch (err) {
      console.error(`Error while adding order line`, err.message);
      next(err);
    }
});
  
/**
 * @swagger
 * /order-details/{lineId}:
 *   delete:
 *     summary: Видалити строку замовлення
 *     tags: [Orders]
 *     parameters:
 *       - name: lineId
 *         in: path
 *         required: true
 *         description: Id стороки замовлення
 *         schema:       
 *           type: integer 
 *     responses:
 *       200:
 *         description: deleted
 *         content:
 *           application/json:
 *             schema:
 *                properties:              
 *                  message:
 *                    type: string
 *                    example: Order line deleted successfully 
 */
router.delete('/:lineId', async function(req, res, next) {
  try {
    res.json(await orderDetails.del(req.params.lineId));
  } catch (err) {
    console.error(`Error while deleting order line`, err.message);
    next(err);
  }
});


module.exports = router;
