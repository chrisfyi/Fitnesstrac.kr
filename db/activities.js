async function createActivity({
    id,
    name,
    description,
  }) {
    try {
  
    } catch (error) {
      throw error;
    }
  }

  // async function updateActivity(id, fields = {}) {
//     // build the set string
//     const setString = Object.keys(fields).map(
//       (key, index) => `"${ key }"=$${ index + 1 }`
//     ).join(', ');
  
//     // return early if this is called without fields
//     if (setString.length === 0) {
//       return;
//     }
  
//     try {
//       const result = await client.query(`
//         UPDATE users
//         SET ${ setString }
//         WHERE id=${ id }
//         RETURNING *;
//       `, Object.values(fields));
  
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }


module.exports = {
    createActivity,
 }
