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
    const market_id = request.header('market_id')
    const market = await Market.find(market_id)
    const product = await Product.find(request.params.id)

    if( product.market_id === market.id ) {
      await next()
    }
    else {
      return response.status(500).json({ message: 'The product does not belong to the informed market.' })
    }
  }
}

module.exports = ProductMarket
