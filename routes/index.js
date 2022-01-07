const bodyParser = require('body-parser');
const express = require('express');

module.exports = () => {
  const router = express.Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  const usersRoutes = require('./users')();
  router.use('/users', usersRoutes);
  return router;
};
