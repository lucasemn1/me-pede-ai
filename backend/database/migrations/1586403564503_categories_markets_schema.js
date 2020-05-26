'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriesMarketsSchema extends Schema {
  up () {
    this.create('categoriesMarkets', (table) => {
      table.increments()

      table.integer('categoryId').unsigned().references('id').inTable('categories')
      table.integer('marketId').unsigned().references('id').inTable('markets')

      table.timestamps()
    })
  }

  down () {
    this.drop('categoriesMarkets')
  }
}

module.exports = CategoriesMarketsSchema
