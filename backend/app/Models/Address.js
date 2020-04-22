'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Market = use('App/Models/Market')

class Address extends Model {
  static get table() {
    return 'addresses'
  }

  markets() {
    return this.hasMany('App/Models/Market')
  }
}

module.exports = Address
