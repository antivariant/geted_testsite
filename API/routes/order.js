const express = require('express');
const router = express.Router();
const order = require('../services/order');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         subtotal: 
 *           type: decimal
 *           description: Сума документа до застосування знижки
 *         discount:
 *           type: decimal
 *           description: Сума знижки 
 *         total:
 *           type: decimal
 *           description: Сума до сплати
 *         userId:
 *           type: integer
 *           description: ID покупця 
 *         userName:
 *           type: string
 *           description: Ім'я покупця
 *         comment:
 *           type: string
 *           description: Коментар покупця до замовлення
 *         status:
 *           type: integer
 *           description: 0 - по-умолчанию/в процессе заказа, 1 - подтвержден, 2 - выполнен) 
 *       example:
 *         subtotal: "1000.00"
 *         discount: "10.00"
 *         total: "990.00"
 *         userId: "+380965939833"
 *         userName: Igor
 *         comment: Якийсь коментар
 *         status: 1
 *   
*/

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: Замовлення. Заголовок і позиції
 *   
 */


/**
 * @swagger
 * /order:
 *   get:
 *     summary: Список всіх замовлень
 *     tags: [Orders]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: false
 *          description: Сторінка     
 *     responses:
 *        200:
 *          description: Успішний запит
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items: 
 *                       $ref: '#/components/schemas/Order'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'     
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await order.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting order `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Додає нове пусте замовлення
 *     tags: [Orders]
 *     requestBody:
 *       description: Заголовок замовлення (без позицій)
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Id покупця
 *               comment:
 *                 type: string
 *                 description: Коментар покупця до замовлення
 *             example:
 *               userId: 1
 *               comment: Якийсь коментар
 *     responses:
 *       200:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *                properties:              
 *                  message:
 *                    type: string
 *                    example: Order created successfully
 */
router.post('/', async function(req, res, next) {
//  console.log(`order request body= ${JSON.stringify(req.body)}`)
  try {
      res.json(await order.create(req.body));
    } catch (err) {
      console.error(`Error while creating order`, err.message);
      next(err);
    }
  });

module.exports = router;


/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Видалити замовлення
 *     tags: [Orders]
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: Id замовлення
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
 *                    example: Order deleted successfully 
 */
 router.delete('/:orderId', async function(req, res, next) {
  try {
    res.json(await order.del(req.params.orderId));
  } catch (err) {
    console.error(`Error while deleting order`, err.message);
    next(err);
  }
});
