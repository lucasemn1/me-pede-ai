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
   * Returns valid tokens.
   * GET jwts
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async listTokens ({ request, response, auth }) {
    const tokens = await auth.getUser().listTokens()

    return tokens
  }
  
  /**
   * Returns the logged in user.
   * GET jwts
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async me ({ request, response, auth }) {
    const user = await auth.getUser()

    return { user }
  }

  /**
   * Cria uma sessão do usuário e retorna o token
   * POST jwts
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login ({ request, response, auth }) {
    const email = request.body.email
    const password = request.body.password
    
    const token = await auth.attempt(email, password)
    return {token}
  }

  /**
   * End user session
   * POST jwts
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async logout ({ request, response, auth }) {
    return await auth.logout()
  }
}

module.exports = JwtController
