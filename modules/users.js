require('../config/environment');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const { httpStatusCodes } = require('../src/utils/httpstatuscode');
const { validateFirebaseToken } = require('../src/utils/middleware');
const { getErrorResponseObject, getSuccessResponseObject } = require('../src/utils/utils');
const { getUserData } = require('../src/services/users/getUsers.service');
const { createUsersData } = require('../src/services/users/createUsers.service');
const { updateUserData } = require('../src/services/users/updateUsers.service');
const { deleteUserData } = require('../src/services/users/deleteUsers.service');
const e = require('express');

const app = express();
app.use(cors({ origin: true }));



app.post('/create-user',  async (req, res) => { //validateFirebaseToken
    try {
         const data = req.body;
         console.log('Data received for new user in module:', data);
         const response = await createUsersData(data);
         return res.status(httpStatusCodes.ok).json(
         getSuccessResponseObject(response, httpStatusCodes.ok));
    } catch (error) {
         const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
         return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

app.get('/get-user',  async (req, res) => { //validateFirebaseToken,
    try {
         const data = req.body.email;
         console.log('Request received to get user with email:', data);
         const response = await getUserData(data);
         return res.status(httpStatusCodes.ok).json(
         getSuccessResponseObject(response, httpStatusCodes.ok));
    } catch (error) {
         const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
         return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

app.put('/update-user', async (req, res) => { //validateFirebaseToken,
    try {
         const data = req.body;
         console.log('Data received for updating user in module:', data);
         const response = await updateUserData(data);
         return res.status(httpStatusCodes.ok).json(
         getSuccessResponseObject(response, httpStatusCodes.ok));
    } catch (error) {
         const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
         return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
})

app.delete('/delete-user',async (req, res) => { //validateFirebaseToken,
    try {
         const data = req.body.email;
         console.log('Data received for deleting user in module:', data);
         const response = await deleteUserData(data);
         return res.status(httpStatusCodes.ok).json(
         getSuccessResponseObject(response, httpStatusCodes.ok));
    } catch (error) {
         const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
         return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

exports.endpoints = functions.https.onRequest(app);