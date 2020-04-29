'use strict'

class UpdateMarket {
  get rules () {
    return {
      cnpj: 'number|max:20|min:13',
      name: 'string|max:254',
      min_value: 'number',
      phone: 'string',
      'address.number': 'number',
      'address.complement': 'string|max:254',
      'address.neighborhood': 'string|max:254',
      'address.city': 'string|max:100',
      'address.uf': 'string|max:2',
      'address.country': 'string|max:50',
      'address.postcode': 'string|max:10',
      'address.street': 'string|max:255',
    }
  }
}

module.exports = UpdateMarket
