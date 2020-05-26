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
    const marketId = request.header('marketId')
    const market = await Market.find(marketId)

    if( !market ) {
      return response.status(404).json({ message: "Market wasn't found." })
    }
    if( market.userId === user.id ) {
      await next()
    }
    else {
      return response.status(500).json({ message: "You are not authorized to change this market" })
    }
  }
}

module.exports = MarketAdm
