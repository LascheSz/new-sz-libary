const verifyToken = require('../middlewares/authMiddleware'),
authorizeRoles = require('../middlewares/roleMiddleware'),
express = require('express'),
router = express.Router(),
{ register, login } = require('../controllers/authController');
user = require('../models/userModel');




// ONlY ADMIN CAN ACCESS THIS ROUTE
router.get('/admin', verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: 'Admin Route'});
});

// Admin Vorstand und Notenwart CAN ACCESS THIS ROUTE
router.get('/setting', verifyToken, authorizeRoles("admin", "vorstand", "notenwart"), (req, res) => {
    res.json({message: 'Settings'});
});

// All CAN ACCESS THIS ROUTE
router.get('/public', verifyToken, authorizeRoles("admin", "vorstand", "notenwart", "user"), (req, res) => {
    res.json({message: 'Public Route'});
});

//Route für Benutzerinformationen
router.get('/info', verifyToken, async (req, res) => {
    try {
        const user = await user.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
        res.json({
            username: user.username,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;