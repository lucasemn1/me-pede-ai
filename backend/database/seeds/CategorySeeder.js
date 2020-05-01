'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CategorySeeder {
  async run () {
    await Factory.model('App/Models/Category').createMany(5)

    // const categories = await Database.select('*').from('categories')
  }
}

module.exports = CategorySeeder
