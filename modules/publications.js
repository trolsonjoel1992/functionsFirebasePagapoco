require('../config/environment');

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const { httpStatusCodes } = require('../src/utils/httpstatuscode');
const { validateFirebaseToken } = require('../src/utils/middleware');
const { getErrorResponseObject, getSuccessResponseObject } = require('../src/utils/utils');
const { createPublicationsData, getPublicationsHome, getPublicationId, deletePublicationId, updatePublicationId} = require('../src/services/publication.service');

const app = express();
app.use(cors({ origin: true }));

app.post('/create-publication',  async (req, res) => { //validateFirebaseToken
    try {
         const data = req.body;
         const response = await createPublicationsData(data);
         return res.status(httpStatusCodes.created)
         .json(getSuccessResponseObject(response, httpStatusCodes.created));
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

app.get('/get-publication-id', async (req, res) => {
    try {
        console.log('Request body:', req.body); // Agrega este log para ver el contenido de req.body
        const data = req.body;
        const response = await getPublicationId(data)
        return res.status(httpStatusCodes.ok)
        .json(getSuccessResponseObject(response, httpStatusCodes.ok))
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'Algo salió mal en Get');
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse)
    }
});

app.delete('/delete-publication', async (req, res) => {
    try {
        const data = req.body.id;
        const response = await deletePublicationId(data)
        return res.status(httpStatusCodes.ok)
        .json(getSuccessResponseObject(response, httpStatusCodes.ok))
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'algo salio mal en Delete')
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse)
    }
});

app.put('/update-publication', async (req, res) => {
    try {
        const data = req.body;
        const response = await updatePublicationId(data);
        return res.status(httpStatusCodes.ok)
        .json(getSuccessResponseObject(response, httpStatusCodes.ok));
    } catch (error) {
        const ErrorResponse = getErrorResponseObject(error, 'algo malio sal');
        return res.status(httpStatusCodes.internalServerError).json(ErrorResponse);
    }
});

exports.endpoints = functions.https.onRequest(app);