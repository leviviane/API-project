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
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154550354936070294/cafe-onion-main.jpeg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154915610153721947/onion-one.jpeg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154915639262203924/onion-three.jpeg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154916016296562768/onion-four.jpeg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154915953759498280/onion-two.jpeg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154916038543151136/onion-five.jpeg'
      },
      {
        spotId: 2,
        preview: true,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154926764334784512/layered-main.jpeg'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154925690609750077/knotted-one.jpeg'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154925709601542195/knotted-two.jpeg'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154925738319958098/knotted-three.jpeg'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154925757286584320/knotted-four.jpeg'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154925774864920728/knotted-five.jpeg'
      },
      {
        spotId: 3,
        preview: true,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154550403430629396/layered-main.jpeg',
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154917566062530630/layered-one.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154917581363351603/layered-two.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154917595867259121/layered-three.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154917620395557005/layered-four.jpeg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://cdn.discordapp.com/attachments/1154550284698263596/1154917642738597898/layered-five.jpeg'
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
