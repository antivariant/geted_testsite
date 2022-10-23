const express = require('express');
const router = express.Router();
const films = require('../services/film');

/** 
 * @swagger
 * /films:
 *  get:
 *    summary: Get all films
 *    responses:
 *      '200':
 *        description: A successful response
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
