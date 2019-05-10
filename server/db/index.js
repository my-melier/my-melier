const db = require('./db');

// register models
const { Wine, SavedWine, User } = require('./models');

module.exports = { db, Wine, SavedWine, User };
