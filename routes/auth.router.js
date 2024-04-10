const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

// ----AUTH ROUTER -----

// POST
// router.post(
//   '/',
//   AuthController.createUser
// );

router.get(
  '/',
  AuthController.getAllUsers
);


module.exports = router;
