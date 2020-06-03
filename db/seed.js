const {
    client,
  } = require('./index');

const {
  createUser,
  getAllUsers,
} = require('./users')

const {
  createActivity,
  getAllActivity,

} = require('./activities')

const {
  createRoutines,
  getAllRoutines,
  getAllRoutinesbyUser,
  getPublicRoutinesbyUser,
} = require('./routines')

const {
  createRoutineActivity,
  getAllRoutineActivity,
} = require('./routine_activities')
  


async function dropTables() {
    try {
      console.log("Starting to drop tables...");

      await client.query(`
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS activities;
      `);

      console.log("Finished dropping tables!")
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    } 
  }
  
 
  async function createTables() {
    try {
      console.log("Starting to build tables...");

      await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        public BOOLEAN DEFAULT false,
        name varchar(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );
      CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        "routineId" INTEGER REFERENCES routines(id),
        "activityId" INTEGER REFERENCES activities(id),
        duration INTEGER,
        count INTEGER
      );
      `);
      
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
     await createUser({ username: 'albert', password: 'bertie99' });
     await createUser({ username: 'sandra', password: '2sandy4me' });
     await createUser({ username: 'glamgal', password: 'soglam' });
  
     
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }

  //IN PROGRESS

  async function createInitialActivities() {
    try {
      // const [ name ] = await getAllActivity();
  
      await createActivity({
        name: "Pushups",
        description: "This is my first activity."
      });
      await createActivity({
        name: "Situps" ,
        description: "This is my second activity."
      });
      await createActivity({
        name: "Jumping Jacks" ,
        description: "This is my third activity."
      });
  
    } catch (error) {
        console.error('Error Creating Activities!')
      throw error;
    }
  }

async function createInitialRoutines() {
  try {
    // const [ id ] = await getAllRoutines();
    const [ user ] = await getAllUsers();

    console.log('>>>>>>',user)
    await createRoutines({
      creatorId: user.id,
      public: true,
      name: "`First Routine`",
      goal: "This is my goal."
    });


    await createRoutines({
      creatorId: user.id,
      public: false,
      name: "`Second Routine`",
      goal: "This is my goal."
    });

    await createRoutines({
      creatorId: user.id,
      public: true,
      name: "`Third Routine`",
      goal: "This is my goal."
    });

    // a couple more
  } catch (error) {
    throw error;
  }
}

async function createInitialRoutineActivities() {
  try {
    
    // const [routineId, activityId ] = await getAllRoutineActivity();
    const [{ id:routineId }] = await getAllRoutines()
    const [{ id:activityId }] = await getAllActivity();
    
    
    // console.log('<<<<<<<<<<<<<<<<<<',routineId)
    // console.log('>>>>>>>>>>>>>>>>>>>',activityId)
    await createRoutineActivity({
      routineId,
      activityId,
      count: 10,
      duration: 10000 
    });

    await createRoutineActivity({
      routineId,
      activityId: 2,
      count: 10,
      duration: 10000 
    });

    await createRoutineActivity({
      routineId,
      activityId: 3,
      count: 10,
      duration: 10000 
    });
    // a couple more
  } catch (error) {
    throw error;
  }
}
    
async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialActivities();
    await createInitialRoutines();
    await createInitialRoutineActivities();
  } catch (error) {
    console.error(error);
  } 
}


async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    const activities = await getAllActivity();
    console.log("getAllActivity:", activities)

    const routines = await getAllRoutines();
    console.log("getAllRoutines:", routines)

    const routineActivity = await getAllRoutineActivity();
    console.log("getAllRoutineActivity:", routineActivity)

    const routinebyUser = await getAllRoutinesbyUser('albert');
    console.log('getAllRoutinesbyUser', routinebyUser)

    const publicRoutinebyUser = await getPublicRoutinesbyUser('albert');
    console.log('getPublicRoutinesbyUser', publicRoutinebyUser)

    console.log("Finished database tests!");

  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

async function init () {
  try {
    await rebuildDB();
    await testDB();
  } catch (error) {
    console.error(error)
  } finally {
    client.end();
  }
}
init();
