const admin = require('firebase-admin');


const db = admin.database();

async function createUsersDataBase(data) {
    console.log('Creating user in repository with data:', data);
    const UserRef = await db.ref(`users/`).push(data);
    const UserSnapshot = await UserRef.once(`value`);
    let value = UserSnapshot.val() || {};
    value.id = UserRef.key;
    return value;
}

async function getUsersDataBase(data) {
    console.log('Fetching user by email in repository with email:', data);
    const usersRef = db.ref('users').orderByChild('email').equalTo(data);
    const userSnapshot = await usersRef.once('value');
    const usersData = userSnapshot.val();
    if (!usersData) {
        throw new Error('User not found');
    }
    const [id, userData] = Object.entries(usersData)[0];
    return { id, ...userData };
}


async function updateUserDataBase(data) {
    console.log('Updating user in repository with data:', data);
    const userRef = db.ref(`users/${data.id}`); 
    await userRef.update(data);
    const updatedSnapshot = await userRef.once('value');
    let value = updatedSnapshot.val() || {};
    value.id = data.id;
    return value;
}

async function deleteUserDataBase(data) {
    const userRef = db.ref(`users/${data.id}`);
    await userRef.update({ deleted: true });
    const updatedSnapshot = await userRef.once('value');
    let value = updatedSnapshot.val() || {};
    value.id = data.id;
    return value;
}

module.exports = { getUsersDataBase, createUsersDataBase, updateUserDataBase, deleteUserDataBase };