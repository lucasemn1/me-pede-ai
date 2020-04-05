'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdressesUsersSchema extends Schema {
  up () {
    this.create('adresses_users', (table) => {
      table.increments()

      table.integer('address_id').unsigned().references('id').on('adresses')
      table.integer('user_id').unsigned().references('id').on('users')

      table.timestamps()
    })
  }

  down () {
    this.drop('adresses_users')
  }
}

module.exports = AdressesUsersSchema
