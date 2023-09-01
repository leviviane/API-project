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
        url: 'https://media.discordapp.net/attachments/1126629909419262092/1146222898357481592/hybe.jpg?width=403&height=539'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://files.slack.com/files-tmb/T03GU501J-F05QJUQLLUB-164a7cb82c/hybe2_720.jpg'
      },
      {
        spotId: 1,
        preview: false,
        url: 'https://files.slack.com/files-tmb/T03GU501J-F05QJUQ61K5-79dbd29404/hybe3_720.jpg'
      },
      {
        spotId: 2,
        preview: true,
        url: 'https://cdn.discordapp.com/attachments/1126629909419262092/1146222897833181264/jyp.jpg'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://files.slack.com/files-tmb/T03GU501J-F05QK2NKQF4-02d7f43b30/jyp2_720.png'
      },
      {
        spotId: 2,
        preview: false,
        url: 'https://files.slack.com/files-tmb/T03GU501J-F05QG4Z8G8M-1e9cfa0afa/jyp3_720.jpg'
      },
      {
        spotId: 3,
        preview: true,
        url: 'https://cdn.discordapp.com/attachments/1126629909419262092/1146222898667847740/aroundus.jpg',
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://files.slack.com/files-tmb/T03GU501J-F05R8PN2FJL-7c0bde31fe/aroundus2_720.jpg'
      },
      {
        spotId: 3,
        preview: false,
        url: 'https://files.slack.com/files-tmb/T03GU501J-F05QK32V3M0-c036f05433/aroundus3_720.jpg'
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
