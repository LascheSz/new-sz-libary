// src/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {username, password, role} = req.body;
        
        // Überprüfen ob Benutzer bereits existiert
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            username,
            password: hashedPassword,
            role: role || 'user'
        };

        await User.create(userData);
        
        res.status(201).json({
            message: 'User created successfully. Username: ' + username
        });
        console.log('User created successfully. Username: ' + username);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {register, login};