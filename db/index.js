const { Client } = require('pg'); // imports the pg module



// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/fitness-dev');



module.exports = {
  client,
}

