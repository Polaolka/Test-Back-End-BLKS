const mapper = require('../dto/mapper');
const { createUserDTO } = require('../dto/requestDTO/auth.dto');
const {
  createUserRespDTO,
  getAllUsersRespDTO,
} = require('../dto/responseDTO/auth.dto');
const AuthService = require('../services/AuthService');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID?.toString() || '';
const BASE_URL = process.env.BASE_URL || "";
const redirectUri = `${BASE_URL}/auth/google/callback`;
const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=profile%20https://www.googleapis.com/auth/userinfo.email`;

class Auth {
  constructor() {}

  // ---- CREATE USER ----
  // static async createUser(req, res, next) {
  //   const RequestDTO = await mapper.toRequestDTO({
  //     data: req,
  //     validationSchema: createUserDTO,
  //   });
  //   const result = await AuthService.createUser(RequestDTO)
  //   console.log("result", result);
  //   const ResponseDTO = await mapper.toResponseDTO({
  //     result,
  //     validationSchema: createUserRespDTO,
  //   });
  //   console.log("ResponseDTO", ResponseDTO);
  //   res.status(result.status).json(ResponseDTO);
  // }

  // ---- GET ALL USERS ----
  static async getAllUsers(req, res, next) {
    try {
      const result = await AuthService.getAllUsers();
      const ResponseDTO = await mapper.toResponseDTO({
        result,
        validationSchema: getAllUsersRespDTO,
      });
      // console.log("ResponseDTO", ResponseDTO);
      res.status(200).json(ResponseDTO);
    } catch (error) {
      next(e);
    }
  }

  // ---- GOOGLE ----
  static async google(req, res, next) {
    try {
      res.redirect(googleAuthUrl);
    } catch (error) {
      console.log('errorGoogle:', error);
    }
  }

    // ---- GOOGLE CALLBACK----
    static async googleCallback() {
      try {
        res.redirect(googleAuthUrl);
      } catch (error) {
        console.log('error:', error);
      }
    }

}

module.exports = Auth;
