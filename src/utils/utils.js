
const env = 'dev';
const{httpStatusCodes, DataValidationError, DataBaseError, AuthorizationError, ResourceNotFoundError} = require('./httpstatuscode.js');


function getDateNow(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return (today = mm + '/' + dd + '/' + yyyy);
}

function getSuccessResponseObject(payload, statusCode, message, title){
    return {
        status: statusCode,
        payload: payload,
        message: message,
        title: title
    };
}

function getErrorResponseObject(error, message){
    const response = {};
    if (error instanceof AuthorizationError) {
        response.status = httpStatusCodes.unauthorized;
    }
    else if (error instanceof DataValidationError) {
        response.status = httpStatusCodes.badRequest;
    }
    else if (error instanceof DataBaseError) {
        response.status = httpStatusCodes.internalServerError;
    }
    else if (error instanceof ResourceNotFoundError) {
        response.status = httpStatusCodes.notFound;
    }
    response.message = message; 
    response.title = error.message || error.code || error;
    return response;
}

module.exports = {
    getDateNow,
    getSuccessResponseObject,
    getErrorResponseObject
};