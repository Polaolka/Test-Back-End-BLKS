// const authHelper = require('../helpers/auth.helper');
const googleAuth = require('../middlewares/GoogleAuth');
const { User } = require('../models/user');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpException = require('../helpers/HttpException.helper');
const authHelper = require('../helpers/auth.helper');

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY?.toString() || '';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY?.toString() || '';
const accessTokenExpiresIn = '30m';
const refreshTokenExpiresIn = '7m';

class Auth {
  constructor() {}

  // ---- GET ALL USERS ----
  async getAllUsers() {
    const result = await User.find();

    return result;
  }

  // ---- GOOGLE CALLBACK----
  async loginFromGoogle(RequestDTO) {
    const code = RequestDTO;

    const userProfile = await googleAuth.getUserInfo(RequestDTO);
    const { email, name } = userProfile;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      const password = uuid();
      const hashPassword = await bcrypt.hash(password, 10);
      try {
        const newUser = await User.create({
          email,
          name,
          password: hashPassword,
        });
        const payload = {
          id: newUser._id,
        };
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
          expiresIn: accessTokenExpiresIn,
        });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
          expiresIn: refreshTokenExpiresIn,
        });
        await User.findByIdAndUpdate(newUser._id, {
          accessToken,
          refreshToken,
        });
        console.log('accessToken in create user:', accessToken);
        return {
          accessToken,
          refreshToken,
        };
      } catch (error) {
        console.error('Error Google registration:', error);
      }
    } else {
      try {
        const payload = {
          id: existUser._id,
        };
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
          expiresIn: accessTokenExpiresIn,
        });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
          expiresIn: refreshTokenExpiresIn,
        });
        await User.findByIdAndUpdate(existUser._id, {
          accessToken,
          refreshToken,
        });
        return {
          accessToken,
          refreshToken,
        };
      } catch (error) {
        console.error('Error Google login:', error);
        throw HttpException.BAD_REQUEST();
      }
    }
  }

  // ---- LOGOUT USER----
  async logoutUser(RequestDTO) {
    const result = await User.findByIdAndUpdate(
      { _id: RequestDTO.id },
      { accessToken: '', refreshToken: '' },
      { new: true }
    );
    return { message: 'logout success' };
  }

  // ---- REFRESH USER ----
  async refreshUser(RequestDTO) {
    const oldRefreshToken = RequestDTO.refreshToken;
    const payload = await authHelper.validateToken({
      type: 'REFRESH',
      token: oldRefreshToken,
    });
    console.log('payload!:', payload);

    const { id } = payload;
    const user = await User.findById({ _id: id });
    if (!user) {
      throw HttpException.BAD_REQUEST();
    }

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: accessTokenExpiresIn,
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: refreshTokenExpiresIn,
    });

    await User.findByIdAndUpdate(
      user._id,
      { accessToken, refreshToken },
      { new: true }
    ).select('-password -createdAt -updatedAt');

    return { accessToken, refreshToken };
  }

  // ---- GET CURRENT USER----
  async getCurrentUser(RequestDTO) {
    const user = await User.findById(RequestDTO.id).select(
      '-password -createdAt -updatedAt'
    );
    if (!user) {
      throw HttpException.BAD_REQUEST();
    }
    console.log('user in current:', user);
    return user;
  }
}

module.exports = new Auth();
