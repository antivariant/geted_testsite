const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const query_text = `
  select 
    o.id, 
    o.docnumber, 
    u.id as userId, 
    u.name as userName, 
    o.subtotal, 
    o.discount, 
    o.total, 
    o.comment, 
    o.status  
  from 
  \`order\` as o
  left join \`user\` as u on (o.user = u.id)
  where not o.deleted
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

async function create(order) {

  const query_text = `
  insert into \`order\`
    (
    user,
    comment
    )
  values
    (
     '${order.userId}',
     '${order.comment}'
     )`;



  //console.log(`query_text=${query_text}`);
  
  const result = await db.query(query_text);
  
  let message = 'Error in creating order';
  
  if (result.affectedRows) {
    message = 'Order created successfully';
  }
  
  return { message };
}


async function del(orderId) {
  const query_text = `
    update \`order\` set deleted=true where id='${orderId}';
  `;
  const result = await db.query(query_text);
  
  let message = 'Error in deleting order';
  
  if (result.affectedRows) {
    message = 'Order deleted successfully';
  }
  
  return { message };
}

module.exports = {
    getMultiple,
    create,
    del
}