const Product = use('App/Models/Product')

class ProductRepository {
  async index() {
  }

  /**
   *
   * @param {Array} data
   */
  async create(data) {
    const product = new Product()
    product.title = data.title
    product.price = data.price
    product.stock = data.stock
    product.picture = 'default.jpg'
    product.marketId = data.marketId

    if( await product.save() ) {
      return product
    }

    return null
  }

  /**
   *
   * @param {Number} id
   */
  async read(id) {
    const product = await Product.find(id)
    
    return product
  }

  /**
   *
   * @param {Array} data
   * @param {Number} id
   */
  async update(data, id) {
    const product = await Product.find(id)

    if( !product ) {
      return null
    }

    product.title = data.title ? data.title : product.title
    product.price = data.price ? data.price : product.price
    product.stock = data.stock ? data.stock : product.stock

    await product.save()

    return product
  }
}

module.exports = ProductRepository
