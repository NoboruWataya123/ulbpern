const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
       
}