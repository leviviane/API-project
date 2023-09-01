'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: "Can't believe we ran into Enhypen while at Hybe. Super cool and new building, highly recommend checking it out!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: "So many cool things inside JYP. Their selection for organic food was insane!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "Pictures shown are both different building and when we got there, the place wasnt as described. Very disappointing!",
        stars: 1
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]:[1, 2, 3] }
    }, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
