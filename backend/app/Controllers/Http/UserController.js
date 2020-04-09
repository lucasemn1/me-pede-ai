'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const users = await User.all()

    for( const user of users.rows ){
      user.adresses = await user.adresses().fetch()
    }

    return response.json(users)
  }

  /**
   * Create/save a new user.
   * POST users
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const user = new User();
    user.name = request.body.name
    user.email = request.body.email
    user.password = request.body.password
    user.phone = request.body.phone
    user.picture = 'default'
    user.date_of_birth = request.body.dateOfBirth
    const address = request.body.address

    await user.save()

    if( address ){
      await user.adresses().create(address)
      user.adresses = await user.adresses().fetch()
    }

    return response.json({user})
  }
}

module.exports = UserController
