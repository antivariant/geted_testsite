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
 *           type: decimal
 *           description: Сума документа до застосування знижки
 *         discount:
 *           type: decimal
 *           description: Сума знижки 
 *         summa:
 *           type: decimal
 *           description: Сума до сплати
 *         customerPhone:
 *           type: string
 *           description: Номер телефону покупця 
 *         customerName:
 *           type: string
 *           description: Ім'я покупця
 *         comment:
 *           type: string
 *           description: Коментар покупця до замовлення
 *         status:
 *           type: integer
 *           description: 0 - по-умолчанию/в процессе заказа, 1 - подтвержден, 2 - выполнен) 
 *       example:
 *         summaWithoutDiscount: "1000.00"
 *         discount: "10.00"
 *         summa: "990.00"
 *         customerPhone: "+380965939833"
 *         customerName: Igor
 *         comment: Якийсь коментар
 *         status: 1
 *   
*/

/**
 * @swagger
 * tags:
 *  name: Invoices
 *  description: Замовлення. Заголовок і позиції
 *   
 */


/**
 * @swagger
 * /invoice:
 *   get:
 *     summary: Список всіх замовлень
 *     tags: [Invoices]
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
 *     summary: Додає нове замовлення
 *     tags: [Invoices]
 *     requestBody:
 *       description: Заголовок замовлення (без позицій)
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               customerPhone:
 *                 type: string
 *                 description: Номер телефону покупця 
 *               customerName:
 *                 type: string
 *                 description: Ім'я покупця
 *               comment:
 *                 type: string
 *                 description: Коментар покупця до замовлення
 *             example:
 *               customerPhone: "+380965939833"
 *               customerName: Igor
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
 *                    example: Invoice created successfully
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
