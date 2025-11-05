const  createPublicationsData  = require('./publications/createPublications.service');
const getPublicationsHome = require('./publications/getPublications.service');
const getPublicationId = require('./publications/getPublications.service');
const deletePublicationId = require('./publications/deletePublications.service');
const updatePublicationId = require('./publications/updatePublications.service')

module.exports = { 
    ...createPublicationsData,
    ...getPublicationsHome,
    ...getPublicationId,
    ...deletePublicationId,
    ...updatePublicationId
}