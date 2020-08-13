'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  market() {
    return this.belongsTo('App/Models/Market', 'marketId', 'id')
  }
}

module.exports = Product
