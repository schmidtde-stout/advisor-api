const { authenticateStytchSession } = require('./stytchwrapper');
const { isString } = require('./utils');

async function authorizeSession(req, res, next) {
  const authHeader = req.headers.authorization;
  if (isString(authHeader) && authHeader.startsWith('Bearer ') && authHeader.length > 7) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      await authenticateStytchSession(token);
      next();
    } catch (err) {
      return res
        .status(err.status_code)
        .send({ Error: `Authorization Failed: ${err.error_message}` });
    }
  } else {
    return res.status(401).send({ Error: 'Authorization Failed: No Token' });
  }
}

module.exports = {
  authorizeSession,
};
