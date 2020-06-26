const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token exists
    if(!token){
        return res.status(401).json({success: false, msg: 'No token, authorization denied'});
    }

    try {
        // pull out the payload
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // set the user in payload to req.user to have access inside the route
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({success: false, msg: 'Token is not valid'});
    }
}