const express = require('express'),
dotenv = require('dotenv').config(),
path = require('path'),
db = require('./src/config/dbConnect'), // Änderung hier - umbenennen zu db
User = require('./src/models/userModel'),
authRoutes = require('./src/routes/authRoutes'),
userRoutes = require('./src/routes/userRoutes')

const app = express()

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// Create tables on startup
async function initializeDatabase() {
    try {
        await User.createTable();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

// Start server
const PORT = process.env.PORT || 5000;
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});