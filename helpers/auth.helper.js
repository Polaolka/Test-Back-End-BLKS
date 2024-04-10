const jwt = require('jsonwebtoken');
const HttpException = require('./HttpException.helper');

class Auth {
  constructor() {}

  async validateToken({ type, token }) {
    try {
      const types = {
        ACCESS: process.env.ACCESS_SECRET_KEY?.toString() || '',
        REFRESH: process.env.REFRESH_SECRET_KEY?.toString() || '',
      };
      if (!types[type]) {
        throw new Error('Invalid token type');
      }
      const secret = types[type];
      const payload = jwt.verify(token, secret);

      return payload;
    } catch (e) {
      if (e.message === 'jwt expired') {
        throw HttpException.UNAUTHORIZED(`${type} token expired`);
      }
      console.log(
        '======================================================================'
      );
      console.log("e.message", e.message)
      throw HttpException.BAD_REQUEST();
    }
  }

  extractTokenFromAuthHeader(headers) {
    if (!headers) {
      throw HttpException.BAD_REQUEST('The headers are required');
    }
    const { Authorization, authorization } = headers;
    const bearerToken = Authorization || authorization;
    if (!bearerToken) {
      throw HttpException.UNAUTHORIZED('Token are required');
    }

    return bearerToken;
  }

  getJwtToken(bearerToken) {
    const [Bearer, token] = bearerToken.split(' ');

    if (!Bearer || !token) {
      throw HttpException.BAD_REQUEST('Invalid Authorization header');
    }

    return token;
  }

  async decodeToken(token, options = {}) {
    return jwt.decode(token, options);
  }
}

module.exports = new Auth();
