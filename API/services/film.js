const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `select m.id, m.title, m.year, p.name
    from 
    movies as m
    left join stars as s 
      on (m.id = s.movie_id)
    left join people as p
      on (s.person_id = p.id) LIMIT ${offset},${config.listPerPage}`
  );

  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


module.exports = {
    getMultiple
}