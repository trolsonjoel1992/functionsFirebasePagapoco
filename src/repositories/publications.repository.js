const admin = require('firebase-admin');


const db = admin.database();


async function createPublicationsDataBase(data) {
         const PublicationRef = await db.ref(`publications/`).push(data);
         const PublicationSnapshot = await PublicationRef.once(`value`);
         let value = PublicationSnapshot.val();
         value.id = PublicationRef.key;
         return value;
}

async function getPublicationsHomeData(premiumCount, nonPremiumCount, lastPremiumKey, lastNonPremiumKey) {
    
    let premiumQuery;
    if (lastPremiumKey) {
        premiumQuery = db.ref('publications').orderByKey().startAfter(lastPremiumKey).limitToFirst(premiumCount);
    } else {
           premiumQuery = db.ref('publications').orderByChild('isPremium').equalTo(true).limitToFirst(premiumCount);
    }
    const premiumSnap = await premiumQuery.once('value');
    const premiumRaw = premiumSnap.val();
    const premium = Object.entries(premiumRaw || {}).map(([id, data]) => ({ id, ...data }));

    let nonPremiumQuery;
    if (lastNonPremiumKey) {
        nonPremiumQuery = db.ref('publications').orderByKey().endBefore(lastNonPremiumKey).limitToLast(nonPremiumCount);
    } else {
           nonPremiumQuery = db.ref('publications').orderByChild('isPremium').equalTo(false).limitToLast(nonPremiumCount);
    }
    const nonPremiumSnap = await nonPremiumQuery.once('value');
    const nonPremiumRaw = nonPremiumSnap.val();
    const nonPremium = Object.entries(nonPremiumRaw || {}).map(([id, data]) => ({ id, ...data }));

    return { premium, nonPremium };
}

module.exports = { createPublicationsDataBase, getPublicationsHomeData };