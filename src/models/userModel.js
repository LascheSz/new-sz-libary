// src/models/userModel.js
const db = require('../config/dbConnect');

class User {
    static async createTable() {
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin', 'vorstand', 'notenwart') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        
        try {
            await db.query(createTableSQL);
            console.log('Users table created or already exists');
        } catch (error) {
            console.error('Error creating users table:', error);
            throw error;
        }
    }

    static async findOne(conditions) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE ?', conditions);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(userData) {
        try {
            const [result] = await db.query('INSERT INTO users SET ?', userData);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;