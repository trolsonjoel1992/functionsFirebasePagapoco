const { getAuth } = require('firebase-admin/auth');
const { firebaseAdmin } = require('../../firebase');

const auth = getAuth(firebaseAdmin);

const apipagapocoInternalToken = process.env.APIPAGAPOCO_INTERNAL_TOKEN;

const validateFirebaseToken = async (req, res, next) => {
   let idToken;
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
         idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(403).json({
            error: 'Unauthorized',
        });
    }
    try {
            const decodedToken = await auth.verifyIdToken(idToken);        
        req.user = decodedToken;
        next();
        return;
    } catch (error) {
        console.error('While verifying Firebase ID token:', error);
        return res.status(403).json({ 
            error: 'Unauthorized'
        });
    }
};

const validateInternalFirebaseFunctionsToken = async (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
          idToken = req.headers.authorization.split('Bearer ')[1];
     } else {
         return res.status(403).json({
             error: 'Unauthorized',
         });
     }
        if (idToken !== apipagapocoInternalToken) {
            return res.status(403).json({
                error: 'Unauthorized',
            });
        }
        next();
        return;
};

module.exports = {
    validateFirebaseToken,
    validateInternalFirebaseFunctionsToken
};