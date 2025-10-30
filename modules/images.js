require('../config/environment');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const { httpStatusCodes } = require('../src/utils/httpstatuscode');
const { validateFirebaseToken } = require('../src/utils/middleware');
const { getErrorResponseObject, getSuccessResponseObject } = require('../src/utils/utils');
const { getImagesId, createImagesData } = require('../src/services/image.service');

const app = express();
app.use(cors({ origin: true }));

app.get('/get-images', async (req, res) => { //validateFirebaseToken
    try {
         const response = await getImagesId(req.user.uid);
         return res.status(httpStatusCodes.OK).json(response);
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

app.post('/create-image',  async (req, res) => { //validateFirebaseToken
    try {
         const data = req.body;
         const response = await createImagesData(data);
         return res.status(httpStatusCodes.created).json(response);
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal');
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

exports.endpoints = functions.https.onRequest(app);