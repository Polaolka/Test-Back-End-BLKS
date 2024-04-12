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
      if (typeof payload === 'string') {
        throw HttpException.BAD_REQUEST();
      }
      // Перевірка терміну дії токена перед викиданням помилки
      if (type === 'ACCESS' && payload.exp < Date.now() / 1000) {
        throw HttpException.UNAUTHORIZED(`${type} token expired`);
      }
      return payload;
    } catch (e) {
      console.log(
        '======================================================================'
      );
      throw HttpException.BAD_REQUEST(`${e.message}`);
    }
  }

  extractTokenFromAuthHeader(headers) {
    if (!headers) {
      throw HttpException.BAD_REQUEST('The headers are required');
    }
    const { Authorization, authorization } = headers;
    const bearerToken = Authorization || authorization;
    if (!bearerToken) {
      throw HttpException.BAD_REQUEST('Token are required');
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
