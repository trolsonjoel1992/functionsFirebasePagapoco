const  createPublicationsData  = require('./publications/createPublications.service');
const getPublicationsHome = require('./publications/getPublications.service');

module.exports = { 
    ...getPublicationsHome,
    ...createPublicationsData
}