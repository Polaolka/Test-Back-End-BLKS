module.exports = {
  '/auth/google': {
    post: {
      summary: 'User login with Google',
      responses: {
        308: {
          description: 'redirect to Google Auth',
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
      tags: ['Auth'],
    },
  },
  '/auth/google/callback': {
    post: {
      summary: 'User login with Google',
      responses: {
        308: {
          description: `http://localhost:3000/BLKS-front-test/:accessToken/:refreshToken`,
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
      tags: ['Auth'],
    },
  },
  '/auth/refresh': {
    post: {
      summary: 'Refresh authentication token',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                refreshToken: {
                  type: 'string',
                },
              },
              required: ['refreshToken'],
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Token refreshed',
          content: {
            'application/json': {
              example: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                email: 'string',
                name: 'string',
                accessToken: 'string',
                refreshToken: 'string',
              },
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                },
                required: ['id'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
      tags: ['Auth'],
    },
  },
  '/auth/logout': {
    post: {
      summary: 'User logout',
      securitySchemes: {
        scheme: bearer,
      },
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
              },
              required: ['id'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User logged out',
          content: {
            '*/*': {
              example: 'string',
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
      tags: ['Auth'],
    },
  },
  '/auth/current': {
    get: {
      summary: 'Get current user information',

      responses: {
        200: {
          description: 'Current user information retrieved',
          content: {
            'application/json': {
              example: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                email: 'string',
                name: 'string',
                accessToken: 'string',
                refreshToken: 'string',
              },
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                },
                required: ['id'],
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Internal Server Error',
        },
      },
      tags: ['Auth'],
    },
  },
};
