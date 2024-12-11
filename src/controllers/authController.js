// src/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// src/controllers/authController.js
// src/controllers/authController.js
const register = async (req, res) => {
    try {
        const {vorname, nachname, email, password, rollen_id} = req.body;
        
        if (!rollen_id) {
            return res.status(400).json({ message: 'Rollen ID ist erforderlich' });
        }

        // Username im Format vorname.nachname generieren
        const username = `${vorname.toLowerCase()}.${nachname.toLowerCase()}`;

        // Überprüfen ob Username bereits existiert
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Überprüfen ob Email bereits existiert
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            vorname,
            nachname,
            username,
            email,
            password: hashedPassword,
            rollen_id
        };

        await User.create(userData);
        
        res.status(201).json({
            message: 'User created successfully',
            user: {
                username,
                email,
                rollen_id
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {usernameOrEmail, password} = req.body;
        
        const user = await User.findByUsernameOrEmail(usernameOrEmail);

        if (!user) {
            return res.status(404).json({message: 'Benutzer nicht gefunden'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Ungültige Anmeldedaten'});
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            token,
            user: {
                vorname: user.vorname,
                nachname: user.nachname,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {register, login};