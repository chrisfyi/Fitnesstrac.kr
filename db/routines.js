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

async function createRoutines({
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

  async function updateRoutines(id, {
    public,
    name,
    goal,
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

  async function getAllRoutines() {
    const { rows } = await client.query(`SELECT * FROM routines;`);

    return rows;
}

async function getAllPublicRoutines() {
  const { rows } = await client.query(`
      SELECT * FROM routines
      WHERE public = true
    ;`);

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
    // const public = await getAllPublicRoutines(id)

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
//     const result = await client.query(`
//       UPDATE users
//       SET ${ setString }
//       WHERE id=${ id }
//       RETURNING *;
//     `, Object.values(fields));

//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
    createRoutines,
    updateRoutines,
    getAllRoutines,
    getAllRoutinesbyUser,
    getAllPublicRoutines,
    getPublicRoutinesbyUser,
    getPublicRoutinesbyActivity
 }