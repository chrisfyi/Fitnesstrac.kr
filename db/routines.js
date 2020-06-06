const {
  client,
} = require('./index');

const {
  getUserbyUsername
} = require('./users')

const {
  getActivitiesbyRoutineId,
  getAllActivity,
} = require('./activities')

async function createRoutine({
    creatorId, 
    public,
    name, 
    goal,
  }) {
    try {
      const { rows } = await client.query(`
      INSERT INTO routines ( "creatorId", public, name , goal)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING "creatorId", public, name, goal;
        `, [ creatorId, public, name, goal]);
    
        return rows;
    } catch (error) {
      throw error;
    }
  }


  async function getAllRoutines() {
    const { rows } = await client.query(`SELECT * FROM routines;`);

    for(let routine of rows) {

      const {rows: activities} = await client.query(`
      SELECT *
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE "routineId" = $1
      `, [routine.id])
      routine.activities = activities
    }

    return rows;
}

async function getPublicRoutines() {
  const { rows } = await client.query(`
      SELECT * FROM routines
      WHERE public = true
    ;`);

    for(let routine of rows) {

      const {rows: activities} = await client.query(`
      SELECT *
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE "routineId" = $1
      `, [routine.id])
      routine.activities = activities
    }

  return rows;
}

// IN PROGRESS

async function getAllRoutinesbyUser({username}) {
  
  try {
    const user  = await getUserbyUsername(username)

    // Find User, Find Routines, Find activities for routines
    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    WHERE routines."creatorId" = $1;
    `, [user.id]);

    for(let routine of rows) {

      const {rows: activities} = await client.query(`
      SELECT *
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE "routineId" = $1
      `, [routine.id])
      routine.activities = activities
    }
   
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getPublicRoutinesbyUser(username) {
  
  try {

    const user = await getUserbyUsername(username)

    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    WHERE routines."creatorId" = $1 AND public = true; 
     `, [user.id]);

     for(let routine of rows) {

      const {rows: activities} = await client.query(`
      SELECT *
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE "routineId" = $1
      `, [routine.id])
      routine.activities = activities
    }
   
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesbyActivity(id) {
  
  try {

    // const activity = await getAllActivity()
    // const public = awai(id)

    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    JOIN routine_activities ON routine_activities."routineId" = routines.id
    WHERE "activityId" = $1 
    AND public = true; 
     `, [id]);

    
 for(let routine of rows) {

      const {rows: activities} = await client.query(`
      SELECT *
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE "routineId" = $1
      `, [routine.id])
      routine.activities = activities
    }
   
    return rows;
  } catch (error) {
    throw error;
  }
}



async function updateRoutine(fields = {}) {
  // build the set string
const id = fields.id
delete fields.id

  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  console.log(fields)

  console.log(setString)
  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {rows: result} = await client.query(`
      UPDATE routines
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return result;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  console.log('Begin destroyRoutine');
  console.log('<<<<<<<<', id);
  try {
      await client.query(`
          DELETE FROM routine_activities
          WHERE "routineId" = ${id};
      `);

      const {rows: [routine]} = await client.query(`
          DELETE FROM routines
          WHERE id = ${id}
          RETURNING *;
      `);
      console.log('Routine deleted: ', routine);

      return routine;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
    createRoutine,
    updateRoutine,
    getAllRoutines,
    getAllRoutinesbyUser,
    getPublicRoutines,
    getPublicRoutinesbyUser,
    getPublicRoutinesbyActivity,
    destroyRoutine
 }