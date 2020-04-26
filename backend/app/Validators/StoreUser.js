'use strict'

const { rule } = use('Validator')

class StoreUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required|string',
      phone: 'required|string',
      date_of_birth: [rule('dateFormat', 'YYYY/MM/DD')],
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

module.exports = StoreUser
