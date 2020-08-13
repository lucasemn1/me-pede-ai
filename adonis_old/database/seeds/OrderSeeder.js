'use strict'

const AddressSeeder = require('./AddressSeeder')
const UserSeeder = require('./UserSeeder')
const MarketSeeder = require('./MarketSeeder')
const CategorySeeder = require('./CategorySeeder')
const ProductSeeder = require('./ProductSeeder')

class OrderSeeder {
  async run () {
    await new AddressSeeder().run()
    await new UserSeeder().run()
    await new MarketSeeder().run()
    await new CategorySeeder().run()
    await new ProductSeeder().run()
  }
}

module.exports = OrderSeeder
