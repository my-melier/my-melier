// associations
const Wine = require('./Wine');
const User = require('./User');
const SavedWine = require('./SavedWine');

// assosications

Wine.belongsToMany(User, { through: { model: SavedWine } });
User.belongsToMany(Wine, { through: { model: SavedWine } });

module.exports = { Wine, User, SavedWine };
