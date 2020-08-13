'use strict'

class UpdateProduct {
  get rules () {
    return {
      title: 'string|min:10|max:254',
      price: 'number',
      stock: 'number',
    }
  }
}

module.exports = UpdateProduct
