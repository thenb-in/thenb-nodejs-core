const CSVAdapter = require('./adapters/csvAdapter');
const SQLiteAdapter = require('./adapters/sqliteAdapter');

function createORMAdapter(type, config) {
    switch (type) {
        case 'csv':
            return new CSVAdapter(config.filePath);
        case 'sqlite':
            return new SQLiteAdapter(config.dbPath);
        default:
            throw new Error(`Unsupported ORM type: ${type}`);
    }
}

module.exports = { createORMAdapter };
