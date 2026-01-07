const express = require('express');
const router = express.Router();

// Controllers
const AuthControllers = require('../controllers/AuthControllers');

// Middlewares
const authMiddleware = require('../middlewares/AuthMiddleware');
const { registerValidation, loginValidation } = require('../middlewares/authValidation');

//AUTH ROUTES

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration data
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               example: Rounak Test
 *             email:
 *               type: string
 *               example: rounak@test.com
 *             password:
 *               type: string
 *               example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

// Register user
router.post('/register', registerValidation, AuthControllers.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: rounak@test.com
 *             password:
 *               type: string
 *               example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

// Login user
router.post('/login', loginValidation, AuthControllers.login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags:
 *       - Auth
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

// Get logged-in user profile (PROTECTED)
router.get('/profile', authMiddleware, AuthControllers.profile);

module.exports = router;

