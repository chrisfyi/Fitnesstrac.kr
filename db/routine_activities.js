const {
  client,
} = require('./index');


async function createRoutineActivity({
    routineId, 
    activityId,
    count,
    duration,
  }) {
    try {
      const { rows } = await client.query(`
      INSERT INTO routine_activities ( "routineId", "activityId", count , duration)
      VALUES($1, $2, $3, $4)
      
      RETURNING "routineId", "activityId", count, duration;
        `, [ routineId, activityId, count, duration]);

        return rows;
    } catch (error) {
      throw error;
    }
  }

  // async function addActivityToRoutine({
  //   routineId,
  //   activityId,
  //   count,
  //   duration, 
  // }){
  //   try {
  //     const { rows } = await client.query(`
  //     INSERT INTO routine_activities ( "routineId", "activityId", count , duration)
  //     VALUES($1, $2, $3, $4)
      
  //     RETURNING "routineId", "activityId", count, duration;
  //       `, [ routineId, activityId, count, duration]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


 //// *****NEEED TO FINISH WRITING THIS FUNCTION*****

  async function updateRoutineActivity(fields = {}) {
    const id = fields.id
    delete fields.id

      const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index +1}`
      ).join(', ');
      console.log (fields)
    try {
      const {rows: result} = await client.query(`
      UPDATE routine_activities
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
      `,Object.values(fields));

      return result;
  
    } catch (error) {
      console.error(error);
    }
  }

  // async function updateRoutine(fields = {}) {
  //   // build the set string
  // const id = fields.id
  // delete fields.id
  
  //   const setString = Object.keys(fields).map(
  //     (key, index) => `"${ key }"=$${ index + 1 }`
  //   ).join(', ');
  //   console.log(fields)
  
  //   console.log(setString)
  //   // return early if this is called without fields
  //   if (setString.length === 0) {
  //     return;
  //   }
  
  //   try {
  //     const {rows: result} = await client.query(`
  //       UPDATE routines
  //       SET ${ setString }
  //       WHERE id=${ id }
  //       RETURNING *;
  //     `, Object.values(fields));
  
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async function getAllRoutineActivity() {
    const { rows } = await client.query(`
    SELECT * 
    FROM routine_activities;
    `);

    return rows;
}

async function destroyRoutineActivity(id) {
  console.log('Entering destroyRoutineActivity');
  console.log('<<<<<<<< destroyRoutineActivity', id);
  try {
    const {rows: [routine]} = await client.query(`
          DELETE FROM routine_activities
          WHERE "routineId" = ${id}
          RETURNING *;
      `);

      console.log('Routine Activity deleted: ', routine);

      return routine;
  } catch (error) {
    console.error(error);
  }
}



module.exports = {
    createRoutineActivity,
    getAllRoutineActivity,
    destroyRoutineActivity,
    updateRoutineActivity
 }