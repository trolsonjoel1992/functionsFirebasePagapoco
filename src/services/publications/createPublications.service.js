const { createPublicationsDataBase } = require('../../repositories/publications.repository');

const { validatePublicationData } = require('../../validators/publicationValidator');


async function createPublicationsData(data) {
    const { error, value } = validatePublicationData(data);
    if (error) {
        throw new Error(`Validation failed: ${error.details[0].message}`);
    }
    try {
        const publications = await createPublicationsDataBase(value);
        return publications;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createPublicationsData };