const mapper = require('../dto/mapper');
const { createUserDTO } = require('../dto/requestDTO/auth.dto');
const { createUserRespDTO } = require('../dto/responseDTO/auth.dto');

class Auth {
  constructor() {}

  // ---- CREATE USER ----
  static async createUser(req, res, next) {
    const RequestDTO = await mapper.toRequestDTO({
      data: req,
      validationSchema: createUserDTO,
    });

    console.log("result", result);
    const ResponseDTO = await mapper.toResponseDTO({
      result,
      validationSchema: createUserRespDTO,
    });
    console.log("ResponseDTO", ResponseDTO);
    res.status(result.status).json(ResponseDTO);
  }
}
module.exports = Auth;
