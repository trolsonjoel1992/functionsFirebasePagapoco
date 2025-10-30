const { deleteUserDataBase, getUsersDataBase } = require('../../repositories/users.repository');
const { validateEmail } = require('../../validators/userValidator');

async function deleteUserData(data) {
    const { error, value } = validateEmail({ email: data });
    if (error) {
        throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    try {
        console.log('Deleting user in service with email:', value);
        const user = await getUsersDataBase(value.email);
        if (!user || !user.id) {
            throw new Error('User not found');
        }
        const deletedUser = await deleteUserDataBase({ id: user.id });
        return deletedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = { deleteUserData };