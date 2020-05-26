'use strict'

const Address = use('App/Models/Address')
const Category = use('App/Models/Category')
const MarketRepository = use('App/Repository/MarketRepository')
const AddressRepository = use('App/Repository/AddressRepository')

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
   * List markets
   * GET markets/
   * @param { Response } ctx.response
   */
  async index({ response }){
    const markets = await this.marketRepository.list()

    for(const market of markets.rows){
      market.address = await market.address().fetch()
      market.categories = await market.categories().fetch()
    }

    return response.status(200).json(markets)
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
    // Cadastro do mercado
    const market = await this.marketRepository.create(request.body)

    if( !market ) {
      return response.status(500).json({message: "Market wasn't created"})
    }

    //Cadastro e tratando endereços
    const addressRepository = new AddressRepository()
    const address = await addressRepository.create(request.body.address)

    if( !address ) {
      await market.delete()
      return response.status(500).json({
        message: "Address wasn't created. Market deleted."
      })
    }

    await market.address().associate(address)
    market.address = address

    //Funcionalidade de linkar categorias
    const categories = {
      categories: request.body.categories,
      registred: [],
    }

    for(const category of categories.categories){
      const categoryRegisted = await Category.query().where('category', category).first()

      if( categoryRegisted ){
        await market.categories().attach(categoryRegisted.id)
        categories.registred.push(category)
      }
    }

    market.categories = categories.registred

    return response.status(200).json(market)
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
  async show ({ params, response }) {
    const marketId = params.id
    const market = await this.marketRepository.read(marketId)

    if( !market ) {
      return response.status(404).json({ message: 'Market was not found' })
    }

    const address = await Address.find(market.addressId)

    market.address = address
    market.categories = await market.categories().fetch()

    return response.status(200).json(market)
  }

  /**
   * Update a single market
   * PUT market/update/:id
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const marketId = params.id
    let market = await this.marketRepository.read(marketId)

    if( !market ){
      return response.status(404).json({message:"Market wasn't found"})
    }

    market = await this.marketRepository.update(market, request.body)

    if( request.body.address ){
      const addressRepository = new AddressRepository()
      await addressRepository.update(market.addressId, request.body.address)
      market.address = await market.address().fetch()
    }

    if( request.body.categories ){
      //Removendo os relacionamentos anteriores para inserir os novos
      await market.categories().detach()

      //Inserindo os novos relacionamentos
      for(const category of request.body.categories ){
        const categoryRegisted = await Category.query().where('category', category).first()

        if( categoryRegisted ){
          await market.categories().attach(categoryRegisted.id)
        }
      }

      market.categories = await market.categories().fetch()
    }

    return response.status(200).json(market)
  }

  /**
   * Delete a single market
   * POST market/delete/:id
   * Ok, it's working
   */
  async delete({ params, response }) {
    const marketId = params.id
    const market = await this.marketRepository.read(marketId)

    if( !market ) {
      return response.status(404).json({ message: 'Market was not found' })
    }

    const address = await Address.find(market.addressId)

    await market.categories().detach()
    await market.delete()
    await address.delete()

    return response.status(200).json()
  }
}

module.exports = MarketController
