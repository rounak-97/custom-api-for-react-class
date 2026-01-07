const express = require('express');
const router = express.Router();

// Controllers
const StudentController = require('../controllers/StudentControllers');

// Middlewares
const authMiddleware = require('../middlewares/AuthMiddleware');
const {
  validateCreateStudent,
  validateUpdateStudent,
  validateStudentQuery
} = require('../middlewares/studentValidation');

// STUDENT ROUTES

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: Student CRUD APIs
 */

/**
 * @swagger
 * /api/students/create:
 *   post:
 *     summary: Create a student
 *     tags:
 *       - Student
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: student
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - phone
 *           properties:
 *             name:
 *               type: string
 *               example: Student One
 *             email:
 *               type: string
 *               example: student@test.com
 *             phone:
 *               type: string
 *               example: "9876543210"
 *     responses:
 *       201:
 *         description: Student created successfully
 */

// CREATE
router.post(
  '/create',
  authMiddleware,
  validateCreateStudent,
  StudentController.createStudent
);

/**
 * @swagger
 * /api/students/all:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Student
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         type: integer
 *         example: 10
 *       - in: query
 *         name: search
 *         type: string
 *         description: Search students by name or email
 *         example: Student
 *     responses:
 *       200:
 *         description: Students fetched successfully
 */

// FETCH (Pagination + Search + Validation)
router.get(
  '/all',
  authMiddleware,
  validateStudentQuery,
  StudentController.getAllStudents
);

/**
 * @swagger
 * /api/students/update/{id}:
 *   put:
 *     summary: Update student
 *     tags:
 *       - Student
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *       - in: body
 *         name: student
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */

// UPDATE
router.put(
  '/update/:id',
  authMiddleware,
  validateUpdateStudent,
  StudentController.updateStudent
);

/**
 * @swagger
 * /api/students/delete/{id}:
 *   delete:
 *     summary: Delete student
 *     tags:
 *       - Student
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */

// DELETE
router.delete(
  '/delete/:id',
  authMiddleware,
  StudentController.deleteStudent
);

module.exports = router;
