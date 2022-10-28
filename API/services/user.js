const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const query_text = `
  select 
    u.id,
    u.name, 
    u.email, 
    u.password  
  from 
  \`user\` as u
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

async function create(user) {

  const query_text = `
  insert into \`user\`
    (
    name, 
    email,
    password
    )
  values
    (
     '${user.name}',
     '${user.email}',
     '${user.password}'
     )`;



  //console.log(`query_text=${query_text}`);
  
  const result = await db.query(query_text);
  
  let message = 'Error in creating user';
  
  if (result.affectedRows) {
    message = 'User created successfully';
  }
  
  return { message };
}


module.exports = {
    getMultiple,
    create
}