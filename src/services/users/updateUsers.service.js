const { updateUserDataBase } = require('../../repositories/users.repository');
const { getUsersDataBase } = require('../../repositories/users.repository');

const { validateUserData } = require('../../validators/userValidator');

async function updateUserData(data) {
    const {error, value} = validateUserData(data);
    if (error) {
        throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    try {
         console.log('Updating user in service with data:', value);
         const user = await getUsersDataBase(value.email);
        if (!user || !user.id) {
            throw new Error('User not found');
        }
        const updatedUser = await updateUserDataBase({ id: user.id, ...value });
        return updatedUser;
    } catch (error) {
        throw new Error(error && error.message ? error.message : String(error));
    }
}
module.exports = { updateUserData };