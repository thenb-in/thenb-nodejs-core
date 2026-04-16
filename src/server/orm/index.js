const CSVAdapter = require('./adapters/csvAdapter');
const SQLiteAdapter = require('./adapters/sqliteAdapter');

/**
 * Factory function that creates and returns a data-access adapter instance
 * based on the specified type.
 *
 * @param {string} type - The adapter type. Supported values: `'csv'`, `'sqlite'`.
 * @param {Object} config - Adapter-specific configuration.
 * @param {string} [config.filePath] - Path to the CSV file (required when type is `'csv'`).
 * @param {string} [config.dbPath] - Path to the SQLite database file (required when type is `'sqlite'`).
 * @returns {CSVAdapter|SQLiteAdapter} An adapter instance for the requested type.
 * @throws {Error} If the specified type is not supported.
 *
 * @example
 * const { createORMAdapter } = require('thenb-nodejs-core/server/orm');
 * const csvAdapter = createORMAdapter('csv', { filePath: './data/users.csv' });
 * const sqliteAdapter = createORMAdapter('sqlite', { dbPath: './data/app.db' });
 */
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
