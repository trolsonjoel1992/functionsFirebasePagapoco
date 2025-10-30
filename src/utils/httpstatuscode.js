class DataValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataValidationError";
    }   
}

class DataBaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataBaseError";
    }   
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthoizationError";
    }   
}

class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ResourceNotFoundError";
    }   
}
const httpStatusCodes = {
    ok: 200,
    created: 201,   
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    unprocessableEntity: 422,
    tomanyRequests: 429,
    internalServerError: 500
};

module.exports = {
    httpStatusCodes,
    DataValidationError,
    DataBaseError,
    AuthorizationError,
    ResourceNotFoundError
};