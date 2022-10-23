const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT ID, INVOICE_ID, VIDEO_ID, SUMMA 
    FROM invoice_details LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(invoiceDetails){
    const result = await db.query(
      `INSERT INTO invoice_details 
      (INVOICE_ID, VIDEO_ID, SUMMA) 
      VALUES 
      (
        ${invoiceDetails.INVOICE_ID},
        ${invoiceDetails.VIDEO_ID},
        ${invoiceDetails.SUMMA})
        `);
  
    let message = `Error in creating new line for invoice ID=${invoiceDetails.INVOICE_ID}`;
  
    if (result.affectedRows) {
      message = `New line for invoice ID=${invoiceDetails.INVOICE_ID} created successfully`;
    }
  
    return {message};
  }


module.exports = {
    getMultiple,
    create
}