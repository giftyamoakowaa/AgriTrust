import express from 'express';
import upload from '../middleware/uploads.js';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/user_controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Users
 * description: User management API
 */

/**
 * @swagger
 * /api/users:
 * post:
 * summary: Create a new user
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * description: Name of the user
 * mobile:
 * type: string
 * description: Mobile number of the user
 * gender:
 * type: string
 * enum: [Male, Female]
 * description: Gender of the user
 * email:
 * type: string
 * format: email
 * description: Email address (optional)
 * ghanaCardImage:
 * type: string
 * format: binary
 * description: Image file for Ghana Card
 * required:
 * - name
 * - mobile
 * - gender
 * - ghanaCardImage
 * responses:
 * 201:
 * description: User created successfully
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 400:
 * description: Ghana Card image is required
 * 500:
 * description: Server error
 */
router.post('/', upload.single('ghanaCardImage'), createUser);

/**
 * @swagger
 * /api/users:
 * get:
 * summary: Get all users
 * tags: [Users]
 * responses:
 * 200:
 * description: A list of users
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/User'
 * 500:
 * description: Server error
 */
router.get('/', getUsers);

/**
 * @swagger
 * /api/users/{id}:
 * put:
 * summary: Update a user by ID
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the user to update
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * name: { type: string }
 * mobile: { type: string }
 * gender: { type: string, enum: [Male, Female] }
 * email: { type: string, format: email }
 * ghanaCardImage: { type: string, format: binary, description: 'New image file (optional)' }
 * responses:
 * 200:
 * description: User updated successfully
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/User'
 * 404:
 * description: User not found
 * 500:
 * description: Server error
 */
router.put('/:id', upload.single('ghanaCardImage'), updateUser);

/**
 * @swagger
 * /api/users/{id}:
 * delete:
 * summary: Delete a user by ID
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the user to delete
 * responses:
 * 200:
 * description: User deleted successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: User deleted
 * 404:
 * description: User not found
 * 500:
 * description: Server error
 */
router.delete('/:id', deleteUser);

export default router;