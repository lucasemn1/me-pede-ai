const Market = use('App/Models/Market')

class MarketRepository {
  /**
   *
   * @param {Object} data
   */
  async create(data) {
    const market = new Market()
    market.cnpj = data.cnpj
    market.name = data.name
    market.min_value = data.min_value
    market.is_open = data.is_open
    market.photo = data.photo
    market.phone = data.phone

    try{
      await market.save()
      return market
    }
    catch(err) {
      console.log(err)
      return null
    }
  }
}

module.exports = MarketRepository
