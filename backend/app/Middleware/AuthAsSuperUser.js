'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthAsSuperUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    const user = await auth.getUser()

    if( user.level >= 2 ){
      return await next()
    }
    
    return response.status(406).json({message:"You haven't authorization to access this route"})
  }
}

module.exports = AuthAsSuperUser
