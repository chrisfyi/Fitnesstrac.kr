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
  //     throw error;
  //   }
  // }

  async function updateRoutineActivity(id, {
    count,
    curation,
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

  async function getAllRoutineActivity() {
    const { rows } = await client.query(`SELECT * FROM routine_activities;`);

    return rows;
}


module.exports = {
    createRoutineActivity,
    updateRoutineActivity,
    getAllRoutineActivity,
 }