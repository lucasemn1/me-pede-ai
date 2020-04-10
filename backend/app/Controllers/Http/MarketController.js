'use strict'

const Market = use('App/Models/Market')
const Address = use('App/Models/Address')
const Category = use('App/Models/Category')
const MarketRepository = use('App/Repository/MarketRepository')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with markets
 */
class MarketController {

  constructor() {
    this.marketRepository = new MarketRepository()
  }

  /**
   * Create/save a new market.
   * POST markets
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const market = await this.marketRepository.create(request.body)

    const address = new Address()
    address.number = request.body.address.number
    address.complement = request.body.address.complement
    address.neighborhood = request.body.address.neighborhood
    address.city = request.body.address.city
    address.uf = request.body.address.uf
    address.country = request.body.address.country
    address.cep = request.body.address.cep
    address.street = request.body.address.street

    const categories = {
      categories: request.body.categories,
      registred: [],
    }

    try{
      await market.save()
    }
    catch (err) {
      return response.status(500).json({
        'message': "Market wasn't created"
      })
    }

    try{
      await address.save()
      await market.address().associate(address)
      market.address = address
    }
    catch (err) {
      await market.delete()
      return response.status(500).json({
        'message': "Address error! Market deleted"
      })
    }

    //Funcionalidade de linkar categorias
    for(const category of categories.categories){
      const categoryRegisted = await Category.query().where('category', category).first()

      if( categoryRegisted ){
        await market.categories().attach(categoryRegisted.id)
        categories.registred.push(category)
      }
    }

    return { market, categories }
  }

  /**
   * Display a single market.
   * GET market/show/:id
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const market_id = params.id
    const market = await Market.find(market_id)

    if( !market ) {
      return response.status(404).json({ message: 'Market was not found' })
    }

    const address = await Address.find(market.address_id)

    market.address = address
    market.categories = await market.categories().fetch()

    return { market }
  }

  /**
   * Delete a single market
   * POST market/delete/:id
   * Ok, it's working
   */
  async delete({ params, response }) {
    const id = params.id

    const market = await Market.find(id)

    if( !market ) {
      return response.status(404).json({ message: 'Market was not found' })
    }

    const address = await Address.find(market.address_id)

    await market.categories().detach()
    await address.delete()
    await market.delete()

    return { message: "Tudo deletado" }
  }
}

module.exports = MarketController
