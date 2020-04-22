'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('picture', 254).notNullable()
      table.string('password', 60).notNullable()
      table.integer('level').notNullable().default(1)
      table.string('phone', 20).notNullable()
      table.date('date_of_birth').notNullable()
      table.integer('address_id').unsigned()
      table.foreign('address_id').references('addresses.id')//.inTable('addresses')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
