const axios = require("axios");
const HttpException = require("../helpers/HttpException.helper");

class GoogleAuth {
  constructor() {
    this.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL?.toString() || '';
    this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID?.toString() || '';
    this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET?.toString() || '';
  }

  async getUserInfo(code) {
    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          client_id: this.GOOGLE_CLIENT_ID,
          client_secret: this.GOOGLE_CLIENT_SECRET,
          redirect_uri: this.GOOGLE_CALLBACK_URL,
          access_type: 'online',
          code,
          grant_type: 'authorization_code',
        },
        { timeout: 5000 } // Таймаут у мілісекундах (в даному випадку 5 секунд)
      );

      const { access_token } = tokenResponse.data;

      const profileResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          timeout: 5000 // Таймаут у мілісекундах (в даному випадку 5 секунд)
        }
      );

      const { name, email } = profileResponse.data;
      return { name, email };
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        // помилка, яка виникла через таймаут запиту
        console.error('Request timed out:', error);
        throw HttpException.UPGRADE_REQUIRED('Request timed out');
      } else {
        // Інші типи помилок
        console.error('Error while fetching user info:', error);
        throw HttpException.INTERNAL_SERVER_ERROR('Error while fetching user info');
      }
    }
  }
}

module.exports = new GoogleAuth();