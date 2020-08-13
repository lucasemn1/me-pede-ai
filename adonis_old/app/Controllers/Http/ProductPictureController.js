'use strict'

const PictureRepository = use('App/Repository/PictureRepository')
const ProductRepository = use('App/Repository/ProductRepository')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class ProductPictureController {
    constructor() {
        this.pictureRepository = new PictureRepository('products')
    }

    /**
   * Create/save a new product picture.
   * POST markets
   * Ok, it's working
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    const marketId = await request.header('marketId')
    const productId = params.productId
    const productRepository = new ProductRepository()
    const product = await productRepository.read(productId)

    if(!product) {
        return response.status(404).json({ message: "Product wasn't found" })
    }

    console.log(`${product.marketId} - ${marketId}`);

    if(product.marketId != marketId) {
        return response.status(401).json({ message: "The informed product does not belong to this marketd" })
    }

    // Impedindo de enviar mais de uma foto por user
    if (product.picture !== 'default.jpg') {
      return response.status(500).json({ message: 'This market already has a picture' })
    }

    const picture = request.file('picture', {
      types: ['png', 'jpg', 'jpeg'],
      size: '2mb',
    })

    const pictureName = await this.pictureRepository.create(picture)

    if (!pictureName) {
      return response.status(500).json({ message: "picture wasn't saved." })
    }

    product.picture = pictureName
    await product.save()

    return response.status(200).json({ pictureName })
  }
}

module.exports = ProductPictureController
