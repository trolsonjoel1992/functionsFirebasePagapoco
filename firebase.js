const {initializeApp, getApp, getApps, cert} = require('firebase-admin/app');
const database = require('firebase-functions/v1/firestore');
const databaseURL = require('firebase-functions/params');
require('dotenv').config();

let firebaseAdmin;

if (getApps().length === 0) {
    firebaseAdmin = initializeApp({
        credentials: cert(`./permissions/${process.env.CREDENTIALS_FILE_NAME}`),
        databaseURL: process.env.RTDB_FIREBASE_DATABASE_URL
    });
} else {
    firebaseAdmin = getApp();
}

module.exports = { firebaseAdmin };