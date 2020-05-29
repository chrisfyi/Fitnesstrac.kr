const {
    client,
    
  } = require('./index');

const {
  createUser,
  getAllUsers,
} = require('./users')
  


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

  // async function createInitialActivities() {
  //   try {
  //     const [albert, sandra, glamgal] = await getAllUsers();
  
  //     await create({
  //       authorId: albert.id,
  //       title: "First Post",
  //       content: "This is my first post. I hope I love writing blogs as much as I love writing them."
  //     });
  
  //     // a couple more
  //   } catch (error) {
  //     throw error;
  //   }
  // }
    
async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}


async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

testDB();


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());