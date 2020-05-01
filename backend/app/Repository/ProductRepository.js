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
    product.market_id = data.market_id

    if( await product.save() ) {
      return product
    }

    return null
  }

  /**
   *
   * @param {Number} id
   */
  async show(id) {
  }

  /**
   *
   * @param {Array} data
   * @param {Number} id
   */
  async update(data, id) {
  }

  /**
   *
   * @param {Number} id
   */
  async delete(id) {
  }
}

module.exports = ProductRepository
