'use strict'

class StoreProduct {
  get rules () {
    return {
      title: 'required|string|min:10|max:254',
      price: 'required|number',
      stock: 'required|number',
    }
  }
}

module.exports = StoreProduct
