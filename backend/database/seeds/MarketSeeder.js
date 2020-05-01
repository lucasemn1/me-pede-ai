'use strict'

/*
|--------------------------------------------------------------------------
| MarketSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class MarketSeeder {
  async run () {
    await Factory.model('App/Models/Market').createMany(10)

    // const markets = await Database.select('*').from('markets')
  }
}

module.exports = MarketSeeder
