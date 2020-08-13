'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const Hash = use('Hash')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jwts
 */
class JwtController {
  /**
   * Returns the logged in user.
   * GET jwts
   * Ok, it's working
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async me ({ request, response, auth }) {
    const user = await auth.getUser()

    return response.status(200).json(user)
  }

  /**
   * Cria uma sessão do usuário e retorna o token
   * POST jwts
   * Ok, it's working
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, response, auth }) {
    const email = request.body.email
    const password = request.body.password

    const token = await auth.attempt(email, password)
    return response.status(200).json(token)
  }
}

module.exports = JwtController
