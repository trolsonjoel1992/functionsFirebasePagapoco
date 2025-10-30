const admin = require('firebase-admin');


const db = admin.database();

async function getImagesDataId(uid) {
    const userRef = db.ref(`user/${uid}`);

    const userSnapshot = await userRef.once('value');
    const userData = userSnapshot.val();

    if (!userData) {
        throw new Error('User not found');
    }
    const imagesId = Object.keys(userData.images);
    if (imagesId.length === 0) {
        return [];
    }
        const imagesDetailsPromises = imagesId.map(async (imageId) => {
            const imageRef = db.ref(`images/${imageId}/imageData`);
            const snapshot = await imageRef.once('value');
            if (snapshot.exists()) {
                return { id: imageId, ...snapshot.val() };
            } else {
                console.warn(`No data found for image ID ${imageId}.`);
                return { id: imageId, data: null };
            }
        });

    const imagesData = await Promise.all(imagesDetailsPromises);
    return imagesData;
}

async function createImagesDataBase(data) {
    try {
        const newImageRef = db.ref('images').push();
        await newImageRef.set(data);
        return { id: newImageRef.key, ...data };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getImagesDataId, createImagesDataBase };