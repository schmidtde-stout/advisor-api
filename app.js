const express = require('express');
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
  app.use((error, req, res, next) => {
    res.status(error.statusCode || error.status || 500).send({
      error: {
        status: error.statusCode || error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

  return app;
};
