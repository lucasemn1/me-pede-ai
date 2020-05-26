'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()

      table.string('title', 254).notNullable()
      table.decimal('price', 6, 2).notNullable()
      table.string('picture').notNullable()
      table.integer('stock', 4).notNullable()

      table.integer('marketId').unsigned().references('id').inTable('markets')

      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
