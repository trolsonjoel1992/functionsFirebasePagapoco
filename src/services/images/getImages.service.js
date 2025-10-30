const imagesRepository = require('../../repositories/images.repository');

async function getImagesId(userUID) {
    try {
        const images = await imagesRepository.getImagesDataId(userUID);
        return images;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getImagesId };