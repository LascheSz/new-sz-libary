const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vorstand', 'notenwart'],
        default: 'user'
    },
},
 {
    timestamps: true,
    autoIndex: true
 }
)

// // Pre-Save Hook
// userSchema.pre('save', function(next) {
//     if (!this.role) { // Überprüfen, ob role leer ist
//         this.role = 'user'; // Setzen Sie role auf 'user', wenn es leer ist
//     }
//     next(); // Fahren Sie mit dem Speichern fort
// });

module.exports = mongoose.model('User', userSchema);