const authHelper = require('../helpers/auth.helper');
const authService = require('../services/AuthService');

class Authenticate {
  constructor() {}

  async authenticate(req, res, next) {
    try {
      const { headers } = req;
      const bearerToken = authHelper.extractTokenFromAuthHeader(headers);
      const token = authHelper.getJwtToken(bearerToken);
      const payload = await authHelper.validateToken({
        type: 'ACCESS',
        token,
      });

      req.id = payload.id;
      req.token = token;
      return next();
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new Authenticate();
