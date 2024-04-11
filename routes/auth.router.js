const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authenticateMiddleware = require('../middlewares/authenticate.middleware');
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

router.get('/current', authenticateMiddleware.authenticate, AuthController.getCurrentUser)

router.post('/refresh', AuthController.refreshUser)

router.post('/logout',  authenticateMiddleware.authenticate, AuthController.logoutUser)

module.exports = router;
