const {
    client,
    getAllUsers // new
  } = require('./index');
  
  async function testDB() {
    try {
      client.connect();
  
      const users = await getAllUsers();
      console.log(users);
    } catch (error) {
      console.error(error);
    } finally {
      client.end();
    }
  }

testDB();


async function dropTables() {
    try {
      await client.query(`
      DROP TABLE IF EXISTS users;
  
      `);
    } catch (error) {
      throw error; 
    }
  }
  
 
  async function createTables() {
    try {
      await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL);
      CREATE TABLE activities (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          description TEXT NOT NULL);
      CREATE TABLE routines (
          id SERIAL PRIMARY KEY,
          "creatorId" INTEGER FOREIGN KEY,
          public BOOLEAN DEFAULT false,
          name varchar(255) UNIQUE NOT NULL,
          goal TEXT NOT NULL);
      CREATE TABLE routine_activities (
          id SERIAL PRIMARY KEY,
          "routineId" INTEGER FOREIGN KEY,
          "activityId" INTEGER FOREIGN KEY,
          duration INTEGER,
          count INTEGER);
      )
      `);
    } catch (error) {
      throw error; 
    }
  }


  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
    } catch (error) {
      console.error(error);
    } finally {
      client.end();
    }
  }
  
  rebuildDB();