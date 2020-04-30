'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Market extends Model {
  address() {
    return this.belongsTo('App/Models/Address')
  }

  categories() {
    return this.belongsToMany(
      'App/Models/Category',
      'market_id',
      'category_id',
      'id',
      'id'
    ).pivotTable('categories_markets')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Market
