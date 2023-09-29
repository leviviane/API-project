'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Heeseung',
        lastName: 'Lee',
        email: 'heeseung@user.io',
        username: 'heelee',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Viviane',
        lastName: 'Le',
        email: 'user1@user.io',
        username: 'leviviane',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Dujun',
        lastName: 'Yoon',
        email: 'user2@user.io',
        username: 'yoonduju',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demouser@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
