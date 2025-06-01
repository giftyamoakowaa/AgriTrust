import express from 'express';
import upload from '../middleware/uploads.js';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/user_controller.js';

const router = express.Router();

router.post('/', upload.single('ghanaCardImage'), createUser);
router.get('/', getUsers);
router.put('/:id', upload.single('ghanaCardImage'), updateUser);
router.delete('/:id', deleteUser);

export default router;
