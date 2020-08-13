'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Market extends Model {
  address() {
    return this.belongsTo('App/Models/Address', 'addressId', 'id')
  }

  categories() {
    return this.belongsToMany(
      'App/Models/Category',
      'marketId',
      'categoryId',
      'id',
      'id'
    ).pivotTable('categoriesMarkets')
  }

  user() {
    return this.belongsTo('App/Models/User', 'userId', 'id')
  }
}

module.exports = Market
