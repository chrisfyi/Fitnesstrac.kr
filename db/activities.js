const {
  client,
} = require('./index');

const {
  getUserbyUsername,
} = require('./users')

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

async function updateActivity({
id,
name,
description,
}) {

  try {

  const activityUpdate = await client.query(`
 
  UPDATE activities
  SET name = $1 , description = $2 
  WHERE activities.id = $3
  RETURNING *
  `, [name, description, id])
  
  return activityUpdate;

} catch (error) {
  throw error;
}
}
 


// async function updateUser(id, fields = {}) {
//   // build the set string
//   const setString = Object.keys(fields).map(
//     (key, index) => `"${ key }"=$${ index + 1 }`
//   ).join(', ');

//   // return early if this is called without fields
//   if (setString.length === 0) {
//     return;
//   }

//   try {
//     const { rows: [ user ] } = await client.query(`
//       UPDATE users
//       SET ${ setString }
//       WHERE id=${ id }
//       RETURNING *;
//     `, Object.values(fields));

//     return user;
//   } catch (error) {
//     throw error;
//   }
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
  updateActivity,
  getAllActivity,
  getActivitiesbyRoutineId
}
