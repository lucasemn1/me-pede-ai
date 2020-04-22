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
      'address.number': 'required|number',
      'address.complement': 'required|string|max:254',
      'address.neighborhood': 'required|string|max:254',
      'address.city': 'required|string|max:100',
      'address.uf': 'required|string|max:2',
      'address.country': 'required|string|max:50',
      'address.cep': 'required|string|max:10',
      'address.street': 'required|string|max:255',
    }
  }
}

module.exports = UpdateUser
