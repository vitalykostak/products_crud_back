class ApiException extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiException(400, message, errors);
  }

  static ResourceExists(message = 'Resource Exists', errors = []) {
    return new ApiException(409, message, errors);
  }

  static ResourceNotFound(message = 'Resource Not Found', errors = []) {
    return new ApiException(404, message, errors);
  }
}

export default ApiException;
