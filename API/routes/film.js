const express = require('express');
const router = express.Router();
const films = require('../services/film');

/**
 * @swagger
 * components:
 *  schemas:
 *    Film:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Movie internal ID
 *        title:
 *          type: string
 *          description: Movie title
 *        year:
 *          type: integer
 *          description: Year
 *      example:
 *        id: 438488
 *        title: Terminator Salvation
 *        year: 2009
 */

/**
 * @swagger
 * tags:
 *  name: Films
 *  description: Films
 */


/** 
 * @swagger
 * /films:
 *    get:
 *      summary: Get all films
 *      tags: [Films]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: false
 *          description: Page number
 *      responses:
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
 *                       $ref: '#/components/schemas/Film'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       page: 
 *                         type: string
 *                         example: '1'     
*/
router.get('/', async function(req, res, next) {
  try {
    res.json(await films.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting films `, err.message);
    next(err);
  }
});


module.exports = router;
