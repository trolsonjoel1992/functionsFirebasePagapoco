require('../config/environment');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const { httpStatusCodes } = require('../src/utils/httpstatuscode');
const { validateFirebaseToken } = require('../src/utils/middleware');
const { getErrorResponseObject, getSuccessResponseObject } = require('../src/utils/utils');
const { getPublicationsHome, createPublicationsData } = require('../src/services/publication.service');

const app = express();
app.use(cors({ origin: true }));

app.post('/create-publication',  async (req, res) => { //validateFirebaseToken
    try {
         const data = req.body;
         const response = await createPublicationsData(data);
         return res.status(httpStatusCodes.created).
         json(getSuccessResponseObject(response, httpStatusCodes.created));
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

app.get('/get-publications-home', async (req, res) => { //validateFirebaseToken
    try {
        const data = req.body;
        const response = await getPublicationsHome(data);
        return res.status(httpStatusCodes.ok)
        .json(getSuccessResponseObject(response, httpStatusCodes.ok));
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

exports.endpoints = functions.https.onRequest(app);