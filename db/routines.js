async function createRoutines({
    creatorId, 
    public,
    name, 
    goal,
  }) {
    try {
  
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
    const { rows } = await client.query(`SELECT id, username FROM users;`);

    return rows;
}

async function getPublicRoutines() {
  const { rows } = await client.query(`SELECT public, true FROM routines;`);

  return rows;
}

async function getAllRoutinesbyUser(userId) {
  try {
    const { rows } = client.query(`
      SELECT * FROM posts
      WHERE "authorId"=${ userId };
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesbyUser(userId) {
  try {
    const { rows } = client.query(`
      SELECT * FROM posts
      WHERE "authorId"=${ userId };
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
 }