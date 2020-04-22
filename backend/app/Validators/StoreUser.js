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
    }
  }
}

module.exports = StoreUser
