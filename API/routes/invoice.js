const express = require('express');
const router = express.Router();
const invoice = require('../services/invoice');


/**
 * @swagger
 * /invoice:
 *   get:
 *    summary: The list of all invoices
 *   responses:
 *    '200':
 *      description: Invoices list
 *      content:
 *        application/json:
 *        schema:
 *          $ref: '../models/invoice.yaml#/Invoice'
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
 *  post:
 *    summary: Adds new ivoice.
 *    requestBody:
 *      description: Invoice head
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref:'../models/invoice.yaml#/Invoice'
 *    responses:
 *      '200':
 *        description: created
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
