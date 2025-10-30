const { createPublicationsDataBase } = require('../../repositories/publications.repository');

async function createPublicationsData(data) {
    try {
        const publications = await createPublicationsDataBase(data);
        return publications;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createPublicationsData };