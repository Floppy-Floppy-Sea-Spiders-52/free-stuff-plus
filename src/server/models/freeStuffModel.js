const { Pool } = require('pg');

// connecting to ElephantSQL DB
const PG_URI =
  'postgres://ctywwdkw:bnMqubsF-oaYFfxAVduGBcYw1wo9w8aP@ruby.db.elephantsql.com/ctywwdkw';

// create a new pool here using connection string from URI
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
