'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdressesSchema extends Schema {
  up () {
    this.create('adresses', (table) => {
      table.increments()
      table.integer('number').notNullable()
      table.string('complement', 254).notNullable()
      table.string('neighborhood', 254).notNullable()
      table.string('street', 254).notNullable()
      table.string('city', 100).notNullable()
      table.string('uf', 2).notNullable()
      table.string('country', 50).notNullable()
      table.string('cep', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('adresses')
  }
}

module.exports = AdressesSchema
