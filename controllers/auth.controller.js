const mapper = require('../dto/mapper');
const {
  getCurrentUserDTO,
  refreshUserDTO,
  logoutUserDTO,
} = require('../dto/requestDTO/auth.dto');
const {
  getAllUsersRespDTO,
  googleCallbackRespDTO,
  getCurrentUserRespDTO,
  userLogoutRespDTO,
  getUserRespDTO
} = require('../dto/responseDTO/auth.dto');
const authMiddleware = require('../middlewares/authenticate.middleware');

const AuthService = require('../services/AuthService');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID?.toString() || '';
const BASE_FRONTEND_URL =
  process.env.BASE_FRONTEND_URL?.toString() ||
  'http://localhost:3000/BLKS-front-test';
const BASE_URL = process.env.BASE_URL || '';
const redirectUri = `${BASE_URL}/auth/google/callback`;
const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=profile%20https://www.googleapis.com/auth/userinfo.email`;

class Auth {
  constructor() {}

  // ---- GET ALL USERS ----
  static async getAllUsers(req, res, next) {
    try {
      const result = await AuthService.getAllUsers();
      const ResponseDTO = await mapper.toResponseDTO({
        result,
        validationSchema: getAllUsersRespDTO,
      });
      res.status(200).json(ResponseDTO);
    } catch (error) {
      next(e);
    }
  }

  // ---- GOOGLE ----
  static async google(req, res, next) {
    try {
      res.redirect(googleAuthUrl);
    } catch (e) {
      // console.log('error:', e);
      next(e);
    }
  }

  // ---- GOOGLE CALLBACK----
  static async googleCallback(req, res, next) {
    try {
      const { code } = req.query;
      const userData = await AuthService.loginFromGoogle(code);
      if (!userData) {
        throw HttpException.BAD_REQUEST();
      }
      const { accessToken, refreshToken } = userData;
      res.redirect(
        `${BASE_FRONTEND_URL}/?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (e) {
      // console.log('error:', e);
      next(e);
    }
  }

  // ---- GET CURRENT USER----
  static async getCurrentUser(req, res, next) {
    const RequestDTO = await mapper.toRequestDTO({
      data: req,
      validationSchema: getCurrentUserDTO,
    });
    const result = await AuthService.getCurrentUser(RequestDTO);
    res.status(200).json(result);
  }

  // ---- REFRESH USER ----
  static async refreshUser(req, res, next) {
    const RequestDTO = await mapper.toRequestDTO({
      data: req,
      validationSchema: refreshUserDTO,
    });
    const result = await AuthService.refreshUser(RequestDTO);
    res.status(200).json(result);
  }

  // ---- LOGOUT USER----
  static async logoutUser(req, res, next) {
    const RequestDTO = await mapper.toRequestDTO({
      data: req,
      validationSchema: logoutUserDTO,
    });
    const result = await AuthService.logoutUser(RequestDTO);
    res.status(200).json(result);
  }
}

module.exports = Auth;
