module.exports = {
    JwtTokenDto: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
      },
      required: ['accessToken', 'refreshToken'],
    },
    CurrentUserDto: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        },
        email: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
      required: [
        'id',
        'email',
        'name',
      ],
    },
    UserLoginDto: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      required: ['email', 'password'],
    },
    UserDto: {
      type: 'object',
      properties: {
        id: {
          type: '	string($uuid)',
        },
        email: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
      required: [
        'id',
        'email',
        'name',
      ],
    },
  };
  
