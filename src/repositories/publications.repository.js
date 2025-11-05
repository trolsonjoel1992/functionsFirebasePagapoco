const admin = require('firebase-admin');


const db = admin.database();


async function createPublicationsDataBase(data) {
         const PublicationRef = await db.ref(`publications/`).push(data);
         const PublicationSnapshot = await PublicationRef.once(`value`);
         let value = PublicationSnapshot.val();
         value.id = PublicationRef.key;
         return value;
}

async function getPublicationsDataHome(premiumCount, nonPremiumCount, lastPremiumKey, lastNonPremiumKey) {
    
    let premium = [];
    if (premiumCount > 0) {
        let premiumQuery;
        if (lastPremiumKey) {
            premiumQuery = db.ref('publications').orderByKey().startAfter(lastPremiumKey).limitToFirst(premiumCount);
        } else {
            premiumQuery = db.ref('publications').orderByChild('isPremium').equalTo(true).limitToFirst(premiumCount);
        }
        const premiumSnap = await premiumQuery.once('value');
        const premiumRaw = premiumSnap.val();
        premium = Object.entries(premiumRaw || {}).filter(([_, data]) => data.isPremium === true).map(([id, data]) => ({ id, ...data }));
    }

    let nonPremium = [];
    if (nonPremiumCount > 0) {
        let nonPremiumQuery;
        if (lastNonPremiumKey) {
            nonPremiumQuery = db.ref('publications').orderByKey().startAfter(lastNonPremiumKey).limitToFirst(nonPremiumCount);
        } else {
            nonPremiumQuery = db.ref('publications').orderByChild('isPremium').equalTo(false).limitToFirst(nonPremiumCount);
        }
        const nonPremiumSnap = await nonPremiumQuery.once('value');
        const nonPremiumRaw = nonPremiumSnap.val();
        nonPremium = Object.entries(nonPremiumRaw || {}).filter(([_, data]) => data.isPremium === false).map(([id, data]) => ({ id, ...data }));
    }

    return { premium, nonPremium };
}

async function getPublicationDataId(id) {
    const PublicationRef = await db.ref(`publications/${id}`);
    const snapshot = await PublicationRef.once('value');
    let value = snapshot.val();
    if (value) {
        return { id, ...value }
    }
    else {
    return null;
    }
}

async function deletePublicationDataId(id) {
    const PublicationRef = await db.ref(`publications/${id}`);
    await PublicationRef.update({ deleted: true });
    const snapshot = await PublicationRef.once('value');
    let value = snapshot.val() || {};
    value.id = id;
    return value;

}
 async function updatePublicationDataId(data) {
    console.log('entra la consulta' );
    const PublicationRef = await db.ref(`publications/${data.id}`);
    await PublicationRef.update(data);
    const snapshot = await PublicationRef.once('value');
    let value = snapshot.val() || {};
    value.id = data.id;
    return value;
 }


module.exports = { createPublicationsDataBase, getPublicationsDataHome, getPublicationDataId, deletePublicationDataId, updatePublicationDataId };