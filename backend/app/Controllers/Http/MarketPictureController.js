'use strict'

const PictureRepository = use('App/Repository/PictureRepository')
const MarketRepostory = use('App/Repository/MarketRepository')
const Helpers = use('Helpers')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class MarketPictureController {
  constructor() {
    this.pictureRepository = new PictureRepository('markets')
  }

  /**
   * Create/save a new market picture.
   * POST markets
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    const marketId = params.marketId
    const marketRepostory = new MarketRepostory()
    const market = await marketRepostory.read(marketId)

    if (!market) {
      return response.status(404).json({ message: "Market wasn't found" })
    }

    // Impedindo de enviar mais de uma foto por user
    if (market.picture !== 'default.jpg') {
      return response.status(500).json({ message: 'This market already has a picture' })
    }

    const picture = request.file('picture', {
      types: ['png', 'jpg', 'jpeg'],
      size: '3mb',
    })

    const pictureName = await this.pictureRepository.create(picture)

    if (!pictureName) {
      return response.status(500).json({ message: "picture wasn't saved." })
    }

    market.picture = pictureName
    await market.save()

    return response.status(200).json({ pictureName })
  }

  /**
   * Create/save a new market picture.
   * POST markets
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, params }) {
    const marketId = params.marketId
    const marketRepostory = new MarketRepostory()
    const market = await marketRepostory.read(marketId)

    // Impedindo que o usuário atualize caso ele tenha imagem default
    if (market.picture === 'default.jpg') {
      return response.status(500).json({ message: 'Unavailable because the market does not have a picture' })
    }

    const picture = request.file('picture', {
      types: ['png', 'jpg', 'jpeg'],
      size: '3mb',
    })

    const pictureName = await this.pictureRepository.update(
      market.picture,
      picture
    )

    if (!pictureName) {
      return response.status(500).json({ message: "The picture could not be changed." })
    }

    market.picture = pictureName

    await market.save()

    return response.status(200).json({ pictureName })
  }

  /**
   * Send market picture.
   * POST markets
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    const market = await new MarketRepostory().read(params.id)

    if (!market) {
      return response.status(404).json({ message: "Market wasn't found" })
    }

    return response.status(200).download(Helpers.tmpPath(`uploads/markets/${market.picture}`))
  }

  /**
   *
   * @param {Response} ctx.response
   */
  async destroy({ params, response }){
    const marketId = params.marketId
    const market = await new MarketRepostory().read(marketId)

    if( market.picture === 'default.jpg' ) {
      return response.status(404).json({ message: 'Image not found. Please send a picture first.' })
    }
    if( !(await this.pictureRepository.delete(market.picture)) ) {
      return response.status(500).json({ message: "Couldn't delete the image" })
    }

    market.picture = 'default.jpg'
    await market.save()

    return response.status(200).json()
  }
}

module.exports = MarketPictureController
