const express = require('express');
const log = require('loglevel');
const HttpError = require('http-errors');

module.exports = () => {
  const app = express();
  const routes = require('./routes')();
  app.use('/', routes);

  // default error catch
  app.use((request, response, next) => {
    return next(new HttpError.NotFound());
  });

  // error handler middleware
  app.use((err, req, res, next) => {
    const error =
      err instanceof HttpError
        ? err
        : HttpError(err.statusCode || err.status || 500, err.message || 'Internal Server Error');
    log.error(`${req.method} ${req.originalUrl} ${error.statusCode}: ${error.message}`);
    res.status(error.statusCode).send({
      error: {
        status: error.statusCode,
        message: error.message,
      },
    });
  });

  return app;
};
