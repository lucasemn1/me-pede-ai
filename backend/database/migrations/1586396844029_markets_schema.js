'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarketSchema extends Schema {
  up () {
    this.create('markets', (table) => {
      table.increments()

      table.string('cnpj', 20).notNullable().unique()
      table.string('name', 254).notNullable()
      table.decimal('min_value', 6, 2).notNullable()
      table.boolean('is_open').default(false)
      table.string('picture', 254).notNullable()
      table.string('phone', 20).notNullable()

      table.integer('address_id').unsigned().references('id').inTable('addresses')

      table.timestamps()
    })
  }

  down () {
    this.drop('markets')
  }
}

module.exports = MarketSchema
