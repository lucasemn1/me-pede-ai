'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesMarketsSchema extends Schema {
  up () {
    this.create('categories_markets', (table) => {
      table.increments()

      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('market_id').unsigned().references('id').inTable('markets')

      table.timestamps()
    })
  }

  down () {
    this.drop('categories_markets')
  }
}

module.exports = CategoriesMarketsSchema
