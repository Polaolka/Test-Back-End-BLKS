// const authHelper = require('../helpers/auth.helper');
const { User } = require("../models/user");

class Auth {
  constructor() {}

  async getAllUsers() {
    const result = await User.find();

    return result;
  }
//   async login(RequestDTO) {
//     const result = await authProvider.login(RequestDTO);

//     return result;
//   }
//   async logout(RequestDTO) {
//     const result = await authProvider.logout(RequestDTO);

//     return result;
//   }
  
//   async verify(RequestDTO) {
//     const result = await authProvider.verify(RequestDTO);
//     return result;
//   }
//   async refresh(RequestDTO) {
//     const { accessToken, refreshToken } = await authProvider.refresh(
//       RequestDTO
//     );
//     return { accessToken, refreshToken };
//   }
//   async current(RequestDTO) {
//     const result = await authProvider.current(RequestDTO);

//     return result;
//   }

}

module.exports = new Auth();
