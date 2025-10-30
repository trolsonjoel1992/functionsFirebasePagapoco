const { createUsersDataBase } = require('../../repositories/users.repository');

const { validateUserData } = require("../../validators/userValidator");


async function createUsersData(data) {
    
    const { error, value } = validateUserData(data);

    if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
    
    try {
         console.log('Creating user in service with data:', data);
         const users = await createUsersDataBase(value);
         return users;
    } catch (error) {
         throw new Error(error.message);
    }
}

module.exports = { createUsersData };

