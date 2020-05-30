const {
  client,
} = require('./index');

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
  const { rows } = await client.query(`SELECT public, true FROM routines;`);

  return rows;
}

// IN PROGRESS

async function getAllRoutinesbyUser(username) {
  try {
    const { rows } = client.query(`
    SELECT routines.name, routines."creatorId", activities.name, activities.description
    FROM routines 
    JOIN users ON routines."creatorId" = users.id;
    JOIN routine_activities ON routine_activities."routineId" = routines.id
    JOIN activities ON routine_activities."activityId" = activities.id
    WHERE users.id = 1;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesbyUser(username) {
  try {
    const { rows } = client.query(`
      SELECT public, true FROM routines
      WHERE "creatorId"=${ username };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createRoutines,
    updateRoutines,
    getAllRoutines,
    getAllRoutinesbyUser,
    getAllPublicRoutines,
    getPublicRoutinesbyUser,
 }