// src/models/userModel.js
const dbConnect = require('../config/dbConnect');

const connection = dbConnect(); // Verbindung aufrufen

class User {
    static createTable() {
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
        
        return new Promise((resolve, reject) => {
            connection.query(createTableSQL, (error, results) => {
                if (error) {
                    console.error('Error creating users table:', error);
                    reject(error);
                } else {
                    console.log('Users table created or already exists');
                    resolve(results);
                }
            });
        });
    }

    static findOne(conditions) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE ?', conditions, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static create(userData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', userData, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = User;