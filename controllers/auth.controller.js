const mapper = require('../dto/mapper');
const { createUserDTO } = require('../dto/requestDTO/auth.dto');
const { createUserRespDTO, getAllUsersRespDTO } = require('../dto/responseDTO/auth.dto');
const AuthService = require('../services/AuthService');

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
    const result = await AuthService.getAllUsers()
    const ResponseDTO = await mapper.toResponseDTO({
      result,
      validationSchema: getAllUsersRespDTO,
    });
    console.log("ResponseDTO", ResponseDTO);
    res.status(200).json(ResponseDTO);
  }
  
  
}
module.exports = Auth;
