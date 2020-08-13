'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static get table() {
    return 'categories'
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'id']
  }

}

module.exports = Category
