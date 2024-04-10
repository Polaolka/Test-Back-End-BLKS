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
      console.log(token);

      req.id = payload.id;
      req.token = token;
      return next();
    } catch (e) {
      next(e);
    }
  }

  async checkRefresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const payload = await authHelper.validateToken({
        type: 'REFRESH',
        token: refreshToken,
      });
      req.body = { ...req.query, ...req.body, ...payload };
      return next();
    } catch (e) {
      next(e);
    }
  }

  async isAccessTokenValid(accessToken) {
    // Логіка перевірки часу дії accessToken
    // ??? можливо використати authHelper.validateToken ???
    return authHelper.validateToken({
      type: 'ACCESS',
      token: accessToken,
    });
  }


}

module.exports = new Authenticate();
