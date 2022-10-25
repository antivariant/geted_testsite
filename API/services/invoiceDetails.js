const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1, invoiceId){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT INVOICE_ID AS invoiceId, VIDEO_ID AS videoId, SUMMA AS summa 
    FROM invoice_details
    WHERE INVOICE_ID = ${invoiceId}
    LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(invoiceDetails) {
  const query_text = `
          INSERT INTO invoice_details 
          (INVOICE_ID, VIDEO_ID, SUMMA) 
          VALUES 
          (
            ${invoiceDetails.invoiceId},
            ${invoiceDetails.videoId},
            ${invoiceDetails.summa}
          )
            `;
  console.log(query_text);
  
  const result = await db.query(query_text);
  
  let message = `Error in creating new line for invoice ID=${invoiceDetails.invoiceId}`;
  
  if (result.affectedRows) {
    message = `New line for invoice ID=${invoiceDetails.invoiceId} created successfully`;
  }
  
  return { message };
}


module.exports = {
    getMultiple,
    create
}