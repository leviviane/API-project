'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        preview: true,
        url: 'https://i.imgur.com/iTSORnx.jpg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://i.imgur.com/hpEIepq.jpg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://i.imgur.com/TyIWtSv.jpg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://i.imgur.com/6TiwOT2.jpg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://i.imgur.com/YHadFYe.jpg'
      },
      {
        spotId: 2,
        preview: true,
        url: 'https://i.imgur.com/PYNyNsI.png'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://i.imgur.com/K0ChQm3.png'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://i.imgur.com/HF3RrTt.png'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://i.imgur.com/nQTUkSc.png'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://i.imgur.com/gr7xV0S.png'
      },
      {
        spotId: 3,
        preview: true,
        url: 'https://i.imgur.com/kCwuTVs.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://i.imgur.com/RO3bE6t.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://i.imgur.com/87ZVfxb.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://i.imgur.com/Usgm9tL.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://i.imgur.com/E33aaRC.jpeg'
      },
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
