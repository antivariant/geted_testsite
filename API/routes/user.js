const express = require('express');
const router = express.Router();
const user = require('../services/user');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Внутрішній ID користувача  
 *         name:
 *           type: string
 *           description: Ім'я покупця
 *         email:
 *           type: string
 *           description: e-mail покупця
 *         password:
 *           type: string
 *           description: Пароль покупця (тимчасово у відкритій формі)
 *       example:
 *         id: 1
 *         name: "Igor"
 *         email: "antivariantum@gmail.com" 
 *         password: "12345" 
 *   
*/

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Користувачі
 *   
 */


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Список всіх користувачів
 *     tags: [Users]
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
 *                       $ref: '#/components/schemas/User'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'     
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Додає користувача
 *     tags: [Users]
 *     requestBody:
 *       description: Новий користувач
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'
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
      res.json(await user.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });

module.exports = router;
