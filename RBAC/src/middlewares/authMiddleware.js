const jwt = require('jsonwebtoken'),
verifyToken = (req, res, next) => {
    let token,
    authHeaders = req.headers.Authorization || req.headers.authorization;
    if(authHeaders && authHeaders.startsWith('Bearer')) {
        token = authHeaders.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: 'Access Denied'});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log("The decoded user is: ", req.user);  
            next();
        } catch (error) {
            res.status(401).json({message: 'Invalid token'});
        }
    } else {
        return res.status(401).json({message: 'No token provided'});
    }
};

module.exports = verifyToken;
