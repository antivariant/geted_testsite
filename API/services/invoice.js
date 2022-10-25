const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT ID, DOCNUMBER, SUMMA_WITHOUT_DISCOUNT, DISCOUNT, SUMMA, 
      CUSTOMER_PHONE, CUSTOMER_NAME, COMMENT, STATUS 
    FROM invoice LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(invoice) {
  // const query_text = `INSERT INTO invoice 
  // (SUMMA_WITHOUT_DISCOUNT,
  //   DISCOUNT,
  //   SUMMA,
  //   CUSTOMER_PHONE,
  //   CUSTOMER_NAME,
  //   COMMENT,
  //   STATUS)
  // VALUES
  // (
  //   ${invoice.summaWithoutDiscount},
  //    ${invoice.discount},
  //    ${invoice.summa},
  //    '${invoice.customerPhone}',
  //    '${invoice.customerName}',
  //    '${invoice.comment}',
  //    ${invoice.status})
  //    `;
 
  const query_text = `INSERT INTO invoice 
  (CUSTOMER_PHONE,
    CUSTOMER_NAME,
    COMMENT)
  VALUES
  (
     '${invoice.customerPhone}',
     '${invoice.customerName}',
     '${invoice.comment}'
     )`;



  //console.log(`query_text=${query_text}`);
  
  const result = await db.query(query_text);
  
  let message = 'Error in creating invoice';
  
  if (result.affectedRows) {
    message = 'Invoice created successfully';
  }
  
  return { message };
}


module.exports = {
    getMultiple,
    create
}