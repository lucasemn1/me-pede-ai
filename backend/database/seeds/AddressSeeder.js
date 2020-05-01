'use strict'

/*
|--------------------------------------------------------------------------
| AddressSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class AddressSeeder {
  async run () {
    await Factory.model('App/Models/Address').createMany(10)

    // const addresses = await Database.select('*').from('addresses')
  }
}

module.exports = AddressSeeder
