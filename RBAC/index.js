const express = require('express'),
dotenv = require('dotenv').config(),
dbConnect = require('./src/config/dbConnect'),
authRoutes = require('./src/routes/authRoutes'),
userRoutes = require('./src/routes/userRoutes')

dbConnect()

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})