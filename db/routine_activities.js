async function createRoutineActivity({
    routineId, 
    activityId,
    count,
    duration,
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

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