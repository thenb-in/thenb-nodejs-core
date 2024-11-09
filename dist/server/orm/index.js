"use strict";

var CSVAdapter = require('./adapters/csvAdapter');
var SQLiteAdapter = require('./adapters/sqliteAdapter');
function createORMAdapter(type, config) {
  switch (type) {
    case 'csv':
      return new CSVAdapter(config.filePath);
    case 'sqlite':
      return new SQLiteAdapter(config.dbPath);
    default:
      throw new Error("Unsupported ORM type: ".concat(type));
  }
}
module.exports = {
  createORMAdapter: createORMAdapter
};