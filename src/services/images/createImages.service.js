const { createImagesDataBase } = require('../../repositories/images.repository');

async function createImagesData(data) {
    try {
        const images = await createImagesDataBase(data);
        return images;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createImagesData };