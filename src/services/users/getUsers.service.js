const { getUsersDataBase } = require('../../repositories/users.repository');

const { validateEmail } = require('../../validators/userValidator');

async function getUserData(data) {
    console.log('Validating email in service with email:', data);
    const { error, value } = validateEmail({ email: data });

    if (error) {
        throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    try {
        console.log('Getting user by email in service with email:', value);
        const user = await getUsersDataBase(value.email);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getUserData };