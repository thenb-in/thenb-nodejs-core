const AuthService = require('./authService');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        req.user = AuthService.verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = authMiddleware;
