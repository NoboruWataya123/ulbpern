const ApiError = require('../errors/ApiError');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
