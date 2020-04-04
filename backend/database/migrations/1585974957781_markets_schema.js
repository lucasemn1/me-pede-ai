'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarketsSchema extends Schema {
  up () {
    this.create('markets', (table) => {
      table.increments()

      table.bigInteger('cnpj', 14).notNullable()
      table.string('name', 254).notNullable()
      table.decimal('min_value', 6, 2).notNullable()
      table.boolean('is_open').defaultTo(false).notNullable()
      table.string('photo', 254).notNullable()
      table.string('phone', 20).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('markets')
  }
}

module.exports = MarketsSchema
