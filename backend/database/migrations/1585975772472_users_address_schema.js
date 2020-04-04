'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersAddressSchema extends Schema {
  up () {
    this.create('users_adresses', (table) => {
      table.increments()

      table.integer('user_id').references('id').inTable('users')
      table.integer('address_id').references('id').inTable('adresses')

      table.timestamps()
    })
  }

  down () {
    this.drop('users_adresses')
  }
}

module.exports = UsersAddressSchema
