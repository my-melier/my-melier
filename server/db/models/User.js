const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
});

module.exports = User;

User.prototype.correctPassword = async function(candidatePwd) {
  const password =
    (await User.encryptPassword(candidatePwd, this.salt())) === this.password();
  return password;
};

User.generateSalt = function() {
  return (salt = bcrypt.genSalt(10));
};

User.encryptPassword = async function(plainText, salt) {
  return await bcrypt.hash(plainText, salt);
};

/**
 * hooks
 */
const setSaltAndPassword = async user => {
  if (user.changed('password')) {
    user.salt = await User.generateSalt();
    user.password = await User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword);
});
