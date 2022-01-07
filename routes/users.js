const express = require('express');
const { isEmpty } = require('./../services/utils');
const User = require('./../models/User');
const { authorizeSession } = require('./../services/auth');

module.exports = () => {
  const router = express.Router();

  router.get('/', authorizeSession, async (req, res) => {
    const users = await User.findAll(null, req.query.limit, req.query.offset);
    const responseCode = users == null ? 500 : 200;
    return res.status(responseCode).send(users);
  });

  router.get('/:id(\\d+)', authorizeSession, async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ id: id });
    const responseCode = user == null ? 500 : isEmpty(user) ? 404 : 200;
    return res.status(responseCode).send(user);
  });

  router.get('/:userId', authorizeSession, async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findOne({ userId: userId });
    const responseCode = user == null ? 500 : isEmpty(user) ? 404 : 200;
    return res.status(responseCode).send(user);
  });

  router.post('/', authorizeSession, async (req, res) => {
    const userId = req.body.userId;
    const email = req.body.email;
    if (!userId || !email) {
      return res.status(400).send({ Error: 'Required Parameters Missing' });
    }
    let user = await User.findOne({ userId: userId });
    if (isEmpty(user)) {
      user = await User.create(userId, email);
      if (user != null) {
        res.setHeader('Location', `/users/${user.id}`);
        return res.status(201).send(user);
      }
    }
    if (user == null) {
      return res.status(500).send({ Error: 'Internal Database Error' });
    }
    res.setHeader('Location', `/users/${user.id}`);
    return res.status(200).send(user);
  });

  return router;
};
