'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Market = use('App/Models/Market')

class MarketAdm {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const user = await auth.getUser()
    const market_id = request.header('market_id')
    const market = await Market.find(market_id)

    if( !market ) {
      return response.status(404).json({ message: "Market wasn't found." })
    }
    if( market.user_id !== user.id ) {
      return response.status(500).json({ message: "You are not authorized to change this market" })
    }

    await next()
  }
}

module.exports = MarketAdm
