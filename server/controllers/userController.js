import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User register function
export const registerUser = async (req, res) => {
    try {
        const { pen, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ pen, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login function
export const loginUser = async (req, res) => {
    try {
        const { pen, password } = req.body;
        const user = await User.findOne({ pen });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User logged in successfully",
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // exclude password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to update user data
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { pen, password, role, name } = req.body
        const updateData = { pen, role, name }
        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }
        const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
