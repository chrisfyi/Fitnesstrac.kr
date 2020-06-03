const {
        client,
        } = require('./index');

const bcrypt = require('bcrypt')

const hashingFunction = async (string) => {
        const hash = await bcrypt.hash(string, 10);


        return hash;
}

async function createUser({ username, password }) {
        
        const hashedPass =  await hashingFunction(password);
        
        try {
          const { result }= await client.query(`
          INSERT INTO users(username, password)
          VALUES ($1, $2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
        `, [username, hashedPass]);
        
      
          return result;
        } catch (error) {
          throw error;
        }
      }

async function getAllUsers() {
        const { rows } = await client.query(`SELECT id, username FROM users;`);

        return rows;
}

async function getUserbyUsername(username){
      const { rows: [user] } = await client.query(` 
      SELECT *
      FROM users
      WHERE username = $1;
      `, [username])

      return user;
}




module.exports = {
   createUser,
   getAllUsers,
   getUserbyUsername
}