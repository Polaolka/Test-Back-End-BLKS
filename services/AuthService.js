// const authHelper = require('../helpers/auth.helper');
const googleAuth = require('../middlewares/GoogleAuth');
const { User } = require('../models/user');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpException = require('../helpers/HttpException.helper');

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY?.toString() || '';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY?.toString() || '';
const accessTokenExpiresIn = '1m';
const refreshTokenExpiresIn = '10m';

class Auth {
  constructor() {}

  async getAllUsers() {
    const result = await User.find();

    return result;
  }

  async loginFfomGoogle(RequestDTO) {
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
        console.log('accessToken:', accessToken);
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

  async logoutUser(RequestDTO) {
    console.log('!!! Logout !!! RequestDTO: ', RequestDTO);
    const result = await User.findByIdAndUpdate(
      { _id: RequestDTO.id },
      { accessToken: '', refreshToken: '' }
    );

    return result;
  }

  async refreshUser(RequestDTO) {
    const oldRefreshToken = RequestDTO.refreshToken;
    const verifiedToken = jwt.verify(oldRefreshToken, REFRESH_SECRET_KEY);
    if (typeof verifiedToken === 'string') {
      throw HttpException.UNAUTHORIZED();
    } else {
      const { id } = verifiedToken;
      const user = await User.findById({ _id: id });
      if (!user) {
        throw HttpException.BAD_REQUEST();
      }
      const payload = { id };

      const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
        expiresIn: accessTokenExpiresIn,
      });
      const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
        expiresIn: refreshTokenExpiresIn,
      });

      await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
      return { accessToken, refreshToken };
    }
  }

  async getCurrentUser(RequestDTO) {
    const user = await User.findById(RequestDTO.id).select(
      '-password -createdAt -updatedAt'
    );
    if (!user) {
      throw HttpException.UNAUTHORIZED();
    }
    return user;
  }
}

module.exports = new Auth();
