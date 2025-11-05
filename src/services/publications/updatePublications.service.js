const {updatePublicationDataId, getPublicationDataId } = require('../../repositories/publications.repository');

const { validatePublicationData } = require('../../validators/publicationValidator')

async function updatePublicationId(data) {
    const {error, value} = validatePublicationData(data);
    if (error) {
        throw new Error(`validate failed ${error.details[0].message}`);
    }
    try {
        const publication = await getPublicationDataId(value.id);
        if (!publication || !publication.id) {
        throw new Error('Publication not found');
    }
    const updatePublication =await updatePublicationDataId({id: publication.id, ...value});
    return updatePublication;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {updatePublicationId}