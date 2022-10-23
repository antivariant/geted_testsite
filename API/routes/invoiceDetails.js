const express = require('express');
const router = express.Router();
const invoiceDetails = require('../services/invoiceDetails');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await invoiceDetails.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting invoice details `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
      res.json(await invoiceDetails.create(req.body));
    } catch (err) {
      console.error(`Error while adding invoice lines`, err.message);
      next(err);
    }
  });

module.exports = router;
