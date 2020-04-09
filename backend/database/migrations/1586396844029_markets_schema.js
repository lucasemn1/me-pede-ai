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
      table.boolean('is_open').notNullable()
      table.string('photo', 254).notNullable()
      table.string('phone', 20).notNullable()

      table.bigInteger('address_id').references('id').on('adresses')

      table.timestamps()
    })
  }

  down () {
    this.drop('markets')
  }
}

module.exports = MarketSchema
