const { createORMAdapter } = require('./orm');
const authMiddleware = require('./src/auth/authMiddleware');
const config = require('./config/config');

function initializeApp() {
    const orm = createORMAdapter(config.db.type, config.db);
    orm.connect();
    return { orm, authMiddleware };
}

module.exports = initializeApp;
