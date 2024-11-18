const verifyToken = require('../middlewares/authMiddleware'),
authorizeRoles = require('../middlewares/roleMiddleware'),
express = require('express'),
router = express.Router(),
{ register, login } = require('../controllers/authController');

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


module.exports = router;