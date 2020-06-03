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
//   const activityupdate = await client.query(`
//   UPDATE name`)

// } catch (error) {
//   throw error;
// }
// }


async function getAllActivity() {
const { rows } = await client.query(`SELECT * FROM activities;`);

return rows;
}

async function getActivitiesbyRoutineId(){
  // join routine activities to activities.id
  const { rows } = await client.query(` SELECT "activityId" FROM routine_activities`)

  return rows;
}


module.exports = {
  createActivity,
  // updateActivity,
  getAllActivity,
  getActivitiesbyRoutineId
}
