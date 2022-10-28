const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const query_text = `
  select 
  p.product as productId, 
  m.title as productName, 
  m.year as productYeat, 
  p.price, 
  p.previous_price as previousPrice,
  p.updated
  from \`pricelist\` as p
  left join \`movies\` as m on (p.product = m.id)
    limit ${offset},${config.listPerPage}`;
  
  console.log(`sql=${query_text}`);
  
  const rows = await db.query(query_text);
  
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(price) {

  const query_text = `
  replace into \`pricelist\`
  (product, price, updated)
  values
    (
     '${price.productId}',
     '${price.price}',
     date(now())
     )`;


  console.log(`query_text=${query_text}`);
  
  const result = await db.query(query_text);
  
  let message = 'Error in creating price';
  
  if (result.affectedRows) {
    message = 'Price created successfully';
  }
  
  return { message };
}


module.exports = {
    getMultiple,
    create
}