const { authenticateStytchSession } = require('./stytchwrapper');
const { isString } = require('./utils');

function authorizeSession(req, res, next) {
  const authHeader = req.headers.authorization;
  if (isString(authHeader) && authHeader.startsWith('Bearer ') && authHeader.length > 7) {
    const token = authHeader.substring(7, authHeader.length);
    authenticateStytchSession(token)
      .then(
        (result) => {
          return next();
        },
        (rejectReason) => {
          return res
            .status(rejectReason.status_code)
            .send(`Authorization Failed: ${rejectReason.error_message}`);
        }
      )
      .catch((err) => {
        return res.status(500).send(`Authorization Failed: ${err.error_message}`);
      });
  } else {
    return res.status(401).send({ message: 'Authorization Failed, No Token' });
  }
}

module.exports = {
  authorizeSession,
};
