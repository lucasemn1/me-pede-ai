'use strict'

const { rule } = use('Validator')

class UpdateUser {
  get rules () {
    return {
      name: 'string|max:254',
      email: 'email|max:254',
      password: 'string',
      phone: 'string|max:20',
      date_of_birth: [rule('dateFormat', 'YYYY/MM/DD')],
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

module.exports = UpdateUser
