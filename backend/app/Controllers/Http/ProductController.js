'use strict'

const ProductRepository = use('App/Repository/ProductRepository')

class ProductController {

  constructor() {
    this.productRepository = new ProductRepository()
  }

  /**
   *
   * @param { Request } ctx.request
   * @param { Response } ctx.request
   */
  async store({ request, response, auth }) {
    const data = request.body
    const market_id = request.header('market_id')
    data.market_id = market_id

    const product = await this.productRepository.create(data)

    if( !product ) {
      return response.status(500).json({ message: 'The product has not been saved'})
    }

    return response.status(201).json(product)
  }
}

module.exports = ProductController
