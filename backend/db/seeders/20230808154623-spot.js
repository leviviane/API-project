'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Enhypen Lane',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
        lat: 100.90,
        lng: 200.90,
        name: 'Enhahouse',
        description: 'House by the beach with four bedrooms and two baths',
        price: 500
      },
      {
        ownerId: 2,
        address: '456 Apple Circle',
        city: 'Milpitas',
        state: 'CA',
        country: 'USA',
        lat: 123.90,
        lng: 300.90,
        name: 'City view house',
        description: 'Downtown city view with one bedroom and one bath',
        price: 350
      },
      {
        ownerId: 3,
        address: '789 Hybe Avenue',
        city: 'Las Vegas',
        state: 'NV',
        country: 'USA',
        lat: 450.90,
        lng: 902.90,
        name: 'Las Vegas Strip Condo',
        description: 'Condo directly on the strip with a pool',
        price: 1000
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]:[1, 2, 3] }
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
