import ApiException from '../exceptions/api.exception.js';

function exceptionMiddleware(e, req, res, next) {
  if (e instanceof ApiException) {
    return res.status(e.status).json({ message: e.message, errors: e.errors });
  }
  console.log(e);
  return res.status(500).json({ message: 'Unexpected error' });
}

export default exceptionMiddleware;
