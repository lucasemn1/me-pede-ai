'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BagsSchema extends Schema {
  up () {
    this.create('bags', (table) => {
      table.increments()

      table.boolean('is_open').notNullable('id').defaultTo(true)
      table.integer('id_user').references('id').inTable('users')
      table.integer('id_market').references('id').inTable('markets')

      table.timestamps()
    })
  }

  down () {
    this.drop('bags')
  }
}

module.exports = BagsSchema
