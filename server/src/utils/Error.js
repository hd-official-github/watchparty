export class ApiError extends Error {
  constructor(statusCode, message, res, stack = '') {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    res.status(403).send({
      error: "Forbidden resource"
    })
  }
}