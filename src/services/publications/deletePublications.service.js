const {deletePublicationDataId, getPublicationDataId} = require('../../repositories/publications.repository')

const {validatePublicationId} = require('../../validators/publicationValidator')

async function deletePublicationId(data) {
    const {error, value} = validatePublicationId({id: data});
    if(error) {
        throw new Error(`Validate failed ${error.details[0].message}`)
    }
    try {
        const publication = await getPublicationDataId(value.id)
        if (!publication || !publication.id) {
            throw new Error('publication not found')
        }
        const deletePublication = await deletePublicationDataId(value.id)
        return deletePublication
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { deletePublicationId };