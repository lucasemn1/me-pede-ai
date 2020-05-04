'use strict'

const ProductRepository = use('App/Repository/ProductRepository')
const Database = use('Database')

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

  /**
   *
   * @param { Request } ctx.request
   * @param { Response } ctx.request
   */
  async update({ request, response }) {
    const data = request.body
    const market_id = request.header('market_id')
    const product_id = request.params.id
    data.market_id = market_id

    const product = await this.productRepository.update(data, product_id)

    if( !product ) {
      return response.status(404).json({ message: 'Product was not found.'})
    }

    return response.status(200).json(product)
  }

  /**
   *
   * @param { Request } ctx.request
   * @param { Response } ctx.request
   */
  async show({ request, response }) {
    const product_id = request.params.id
    const product = await this.productRepository.read(product_id)

    if( !product ) {
      return response.status(404).json({ message: 'Product was not found.' })
    }

    return response.status(200).json(product)
  }

  /**
   *
   * @param { Request } ctx.request
   * @param { Response } ctx.request
   */
  async delete({ request, response }) {
    const product_id = request.params.id
    const product = await this.productRepository.read(product_id)

    if( !product ) {
      return response.status(404).json({ message: 'Product was not found.' })
    }

    if( await product.delete() ) {
      return response.status(200).json({})
    }
    else {
      return response.status(500).json({ message: 'It was not possible to delete the product' })
    }
  }

  /**
   *
   * @param { Request } ctx.request
   * @param { Response } ctx.request
   */
  async index({ request, response }) {
    const page = request.qs.page || 1
    const market = request.qs.market
    const products = await Database
      .select([
        'products.title', 
        'products.price',
        'products.picture', 
        'products.stock'
      ])
      .from('products')
      .where('products.market_id', '=', market)
      .limit(10)
      .offset( ( page - 1 ) * 10 )

    return products
  }
}

module.exports = ProductController
