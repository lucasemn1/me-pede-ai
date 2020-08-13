'use strict'

class StoreMarket {
  get rules () {
    return {
      cnpj: 'required|number|max:20|min:13',
      name: 'required|string|max:254',
      minValue: 'required|number',
      phone: 'required|string',
      'address.number': 'required|number',
      'address.complement': 'required|string|max:254',
      'address.neighborhood': 'required|string|max:254',
      'address.city': 'required|string|max:100',
      'address.uf': 'required|string|max:2',
      'address.country': 'required|string|max:50',
      'address.postcode': 'required|string|max:10',
      'address.street': 'required|string|max:255',
    }
  }
}

module.exports = StoreMarket
