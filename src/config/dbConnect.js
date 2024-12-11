// src/config/dbConnect.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConnect = async () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000
    });

    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database');
        connection.release();
    } catch (err) {
        console.error('Error connecting to database:', err);
        if (err.code === 'ETIMEDOUT') {
            console.log('Connection timed out. Please check your network settings.');
        }
        throw err;
    }

    return pool;
};

module.exports = dbConnect;