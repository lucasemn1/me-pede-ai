'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Market = use('App/Models/Market')
const Product = use('App/Models/Product')

class ProductMarket {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const marketId = request.header('marketId')
    const market = await Market.find(marketId)
    const product = await Product.find(request.params.id)

    if( product.marketId === market.id ) {
      await next()
    }
    else {
      return response.status(500).json({ message: 'The product does not belong to the informed market.' })
    }
  }
}

module.exports = ProductMarket
