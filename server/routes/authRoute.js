import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/register', registerUser); // only Admins can create users
authRoute.post('/login', loginUser); // open to all

// A basic protected route which will verify the token on each request
authRoute.get('/protected', verifyToken, (req, res) => res.status(200).json({ message: `Welcome ${req.user.pen}`, role: req.user.role }));

// A route to get all users
authRoute.get('/users', verifyToken, isAdmin, getAllUsers);


export default authRoute;