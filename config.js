require('dotenv').config();

const {
  BASE_URL,
  BASE_APP_ENDPOINT,
  PORT,
  SECURITY_TOKEN,
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
} = process.env;
class Config {
  constructor() {
    this.PORT = PORT || 4000;
    this.BASE_URL = BASE_URL || '';
    this.BASE_APP_ENDPOINT_FOR_ROUTER = BASE_APP_ENDPOINT || '/api/v0';
    this.ACCESS_SECRET_KEY =
    ACCESS_SECRET_KEY || 'my-super-secret-access-token-my-super-secret';
    this.REFRESH_SECRET_KEY =
    REFRESH_SECRET_KEY || 'my-super-secret-refresh-token-my-super-secret';
    this.SECURITY_TOKEN = SECURITY_TOKEN || 'Bearer token';
  }
}
module.exports = new Config();
