const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

// ----AUTH ROUTER -----

// POST
// router.post(
//   '/',
//   AuthController.createUser
// );

router.get('/', AuthController.getAllUsers);

router.get('/google', AuthController.google);

router.get('/google/callback', AuthController.googleCallback)

module.exports = router;
