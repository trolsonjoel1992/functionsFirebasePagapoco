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
    
    console.log('Fetching publications home in repository with params:', { premiumCount, nonPremiumCount, lastPremiumKey, lastNonPremiumKey });
    let premiumQuery;
    if (lastPremiumKey) {
        console.log('Premium: paginando por key', lastPremiumKey);
        premiumQuery = db.ref('publications').orderByKey().startAfter(lastPremiumKey).limitToFirst(premiumCount);
    } else {
           console.log('Premium: filtrando por isPremium true');
           premiumQuery = db.ref('publications').orderByChild('isPremium').equalTo(true).limitToFirst(premiumCount);
    }
    const premiumSnap = await premiumQuery.once('value');
    const premiumRaw = premiumSnap.val();
    console.log('Premium raw result:', premiumRaw);
    const premium = Object.entries(premiumRaw || {}).map(([id, data]) => ({ id, ...data }));
    console.log('Premium parsed result:', premium);

    let nonPremiumQuery;
    if (lastNonPremiumKey) {
        console.log('NonPremium: paginando por key', lastNonPremiumKey);
        nonPremiumQuery = db.ref('publications').orderByKey().endBefore(lastNonPremiumKey).limitToLast(nonPremiumCount);
    } else {
           console.log('NonPremium: filtrando por isPremium false');
           nonPremiumQuery = db.ref('publications').orderByChild('isPremium').equalTo(false).limitToLast(nonPremiumCount);
    }
    const nonPremiumSnap = await nonPremiumQuery.once('value');
    const nonPremiumRaw = nonPremiumSnap.val();
    console.log('NonPremium raw result:', nonPremiumRaw);
    const nonPremium = Object.entries(nonPremiumRaw || {}).map(([id, data]) => ({ id, ...data }));
    console.log('NonPremium parsed result:', nonPremium);

    return { premium, nonPremium };
}

module.exports = { createPublicationsDataBase, getPublicationsHomeData };