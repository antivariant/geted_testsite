const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1, orderId){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`
  SELECT 
  d.id as lineId, 
  p.id as productId, 
  p.title as productTitile, 
  p.year as productYear, 
  d.price, 
  d.discount
FROM \`order_details\` as d
left join \`movies\` as p on (d.product = p.id)
WHERE d.order_id = ${orderId}
    limit ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(orderDetails) {
  const query_text = `
  insert into \`order_details\`(order_id, product, price, discount) 
  values(
    ${orderDetails.orderId},
    ${orderDetails.videoId},
    (select price from \`pricelist\` where product=${orderDetails.videoId}),
    0
    )`;
  console.log(query_text);
  
  const result = await db.query(query_text);
  
  let message = `Error in creating new line for order ID=${orderDetails.orderId}`;
  
  if (result.affectedRows) {
    message = `New line for order ID=${orderDetails.orderId} created successfully`;
  }
  
  return { message };
}

async function del(orderLineId) {
  const query_text = `
  delete from \`order_details\` 
  where id=${orderLineId}`;
  console.log(query_text);
  
  const result = await db.query(query_text);
  
  let message = `Error deleting line ID=${orderLineId}`;
  
  if (result.affectedRows) {
    message = `Line ID=${orderLineId} deleted successfully`;
  }
  
  return { message };
}




module.exports = {
    getMultiple,
    create,
    del
}