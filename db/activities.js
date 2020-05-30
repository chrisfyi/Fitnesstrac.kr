const {
  client,
} = require('./index');

async function createActivity({
  name,
  description,
}) {
  try {
      const { rows } = await client.query(`
        INSERT INTO activities (name , description)
        VALUES($1, $2)
        ON CONFLICT (name) DO NOTHING
        RETURNING name, description;
          `, [ name, description]);
      
          return rows;
  } catch (error) {
    throw error;
  }
}

// async function updateActivity(id, {
// name,
// description,
// }) {
// try {

// } catch (error) {
//   throw error;
// }
// }

async function getAllActivity() {
const { rows } = await client.query(`SELECT * FROM activities;`);

return rows;
}


module.exports = {
  createActivity,
  // updateActivity,
  getAllActivity,
}
