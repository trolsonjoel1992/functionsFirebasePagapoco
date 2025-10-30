const  createImagesData  = require('./publications/createPublications.service');
const getImagesId = require('./publications/getPublications.service');

module.exports = { 
    ...getImagesId,
    ...createImagesData
}