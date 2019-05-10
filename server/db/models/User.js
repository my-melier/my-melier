const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = async function(candidatePwd) {
  console.log('correct password func')

  return (something =
    (await User.encryptPassword(candidatePwd, this.salt())) === this.password())
  // console.log('right side', this.password())
  // console.log('left side:', User.encryptPassword(candidatePwd, this.salt()))
  // console.log('what is this?', something)
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return (salt = bcrypt.genSalt(10))
}

User.encryptPassword = async function(plainText, salt) {
  return await bcrypt.hash(plainText, salt)
}

/**
 * hooks
 */
const setSaltAndPassword = async user => {
  if (user.changed('password')) {
    user.salt = await User.generateSalt()
    user.password = await User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
