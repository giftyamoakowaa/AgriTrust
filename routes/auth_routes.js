// routes/auth_routes.js

import express from 'express';
import { loginUser } from '../controllers/auth_controller.js';

const authRoutes = express.Router();

// Swagger JSDoc comments are excluded as per our swagger.yaml strategy
// This file only contains the routes.

authRoutes.post('/login', loginUser);

export default authRoutes;