'use strict'

const User = use('App/Models/User')
const UserRepository = use('App/Repository/UserRepository')
const AddressRepository = use('App/Repository/AddressRepository')
const { validate } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  constructor() {
    this.userRepository = new UserRepository()
  }

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
  async index ({ response }) {
    const users = await User.all()

    for( const user of users.rows ){
      user.adresses = await user.address().fetch()
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
    const user = await this.userRepository.create(request.body)

    if( !user ){
      return response.status(500).json({message: "User wasn't created"})
    }

    if( request.body.address ){
      const addressRepository = new AddressRepository()
      const address = await addressRepository.create(request.body.address)

      await user.address().associate(address)
      user.address = await user.address().fetch()
    }

    return response.json({user})
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, auth }){
    let user = await auth.getUser()

    user = await this.userRepository.update(user, request.body)

    return response.json({user})
  }
}

module.exports = UserController
