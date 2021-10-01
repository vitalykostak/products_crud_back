import { validationResult } from 'express-validator';
import ApiException from '../exceptions/api.exception.js';

class RequestHelper {
  static checkValidFields(req) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw ApiException.BadRequest('Validation Error', result.array());
    }
  }
}

export default RequestHelper;
