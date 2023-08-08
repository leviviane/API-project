'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate ([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-3-17',
        endDate: '2024-3-21'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-10-15',
        endDate: '2023-10-20'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2024-1-10',
        endDate: '2024-1-15'
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
