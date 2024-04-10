const { log } = require('console');
const HttpException = require('../helpers/HttpException.helper');

class Mapper {
  constructor() {}
  //
  async toRequestDTO({ data, validationSchema, options }) {
    try {
      const DTO = await this._createDTO({ data, validationSchema, options });
      return DTO;
    } catch (e) {
      console.log("e.message in mapper", e.message);
      throw HttpException.BAD_REQUEST(e.message);
    }
  }
  //
  async toResponseDTO({ result, validationSchema, options = {} }) {
    try {
      const DTO = await this._createDTO({
        data: result,
        validationSchema,
        options,
      });
      return DTO;
    } catch (e) {
      console.log("!!!!! e.message in mapper", e.message);
      throw HttpException.BAD_REQUEST(e.message);
    }
  }

  async _createDTO({
    data,
    validationSchema,
    options: { pagination = false } = {},
  }) {
    let result;
    if (data && data.hasOwnProperty('body')) {
      const { body, params, query, files, id } = data;
      result = { id, ...body, ...params, ...query, files};
      console.log('id:', id);
      if (pagination) {
        result = { ...result, ...request.getPagination(query) };
      }
    } else {
      result = data;
    }

    return validationSchema.validateAsync(result, {
      logs: { wrap: { label: '' } },
      convert: true,
      stripUnknown: true,
    });
  }
}
module.exports = new Mapper();
