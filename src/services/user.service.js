const createUsersData = require('./users/createUsers.service');
const getUserEmail = require('./users/getUsers.service');
const updateUserData = require('./users/updateUsers.service');
const deleteUserData = require('./users/deleteUsers.service');

module.exports = { 
    ...getUserEmail,
    ...createUsersData, 
    ...updateUserData,
    ...deleteUserData
}