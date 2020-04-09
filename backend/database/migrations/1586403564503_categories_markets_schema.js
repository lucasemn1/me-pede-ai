'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesMarketsSchema extends Schema {
  up () {
    this.create('categories_markets', (table) => {
      table.increments()

      table.bigInteger('category_id').references('id').on('categories')
      table.bigInteger('market_id').references('id').on('markets')

      table.timestamps()
    })
  }

  down () {
    this.drop('categories_markets')
  }
}

module.exports = CategoriesMarketsSchema
