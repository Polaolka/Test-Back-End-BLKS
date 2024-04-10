const axios = require("axios");

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
        }
      );
      // console.log("tokenResponse.data:", tokenResponse.data);

      const { access_token } = tokenResponse.data;

      const profileResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const { name, email } = profileResponse.data;
      // console.log("profileResponse.data:", profileResponse.data);
      return { name, email };
    } catch (error) {
      console.error('Error while fetching user info:', error);
      throw error;
    }
  }
}

module.exports = new GoogleAuth();