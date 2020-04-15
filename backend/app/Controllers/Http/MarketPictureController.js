'use strict'

const PictureRepository = use('App/Repository/PictureRepository')
const MarketRepostory = use('App/Repository/MarketRepository')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
        if (market.photo !== 'default.jpg') {
            return response.status(500).json({ message: 'This market already has a photo' })
        }

        const photo = request.file('photo', {
            type: ['image'],
            size: '3MB',
            extnames: ['png', 'jpg', 'jpeg']
        })

        const photoName = await this.pictureRepository.create(photo)

        if (!photoName) {
            return response.status(500).json({ message: "Photo wasn't saved." })
        }

        market.photo = photoName
        await market.save()

        return response.status(200).json({photoName})
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

        if(market.photo === 'default.jpg'){
            return response.status(500).json({ message: 'Unavailable because the market does not have a photo' })
        }

        
    }
}

module.exports = MarketPictureController
