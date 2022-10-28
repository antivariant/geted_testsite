const express = require('express');
const router = express.Router();
const pricelist = require('../services/pricelist');

/**
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       properties:
 *         productId: 
 *           type: decimal
 *           description: ID відео
 *         productName: 
 *           type: string
 *           description: Назва відео 
 *         productYear: 
 *           type: string
 *           description: Рік відео 
 *         price:
 *           type: decimal
 *           description: Ціна 
 *         previousPrice:
 *           type: decimal
 *           description: Попередня ціна
 *         updated:
 *           type: date
 *           description: Остання дата зміни ціни
 *       example:
 *         productId: 438488
 *         productName: Terminator Salvation
 *         productYear: 2009
 *         price: "1000.00"
 *         previousPrice: "1200.00"
 *         updated: "2022-10-26" 
 *   
*/



/**
 * @swagger
 * /pricelist:
 *   get:
 *     summary: Прайс ліст
 *     tags: [Films]
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
 *                       $ref: '#/components/schemas/Price'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'     
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await pricelist.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting pricelist `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /pricelist:
 *   post:
 *     summary: Додає нову ціну
 *     tags: [Films]
 *     requestBody:
 *       description: Нова ціна
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: Id фільму
 *               price:
 *                 type: decimal
 *                 description: Ціна
 *             example:
 *               productId: 438488
 *               price: 1000
 *     responses:
 *       200:
 *         description: created
 *         content:
 *           application/json:
 *             schema:
 *                properties:              
 *                  message:
 *                    type: string
 *                    example: Price created successfully
 */
router.post('/', async function(req, res, next) {
//  console.log(`order request body= ${JSON.stringify(req.body)}`)
  try {
      res.json(await pricelist.create(req.body));
    } catch (err) {
      console.error(`Error while creating price`, err.message);
      next(err);
    }
  });

module.exports = router;
