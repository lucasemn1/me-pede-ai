const Market = use('App/Models/Market')
const Helpers = use('Helpers')

class MarketRepository {
  /**
   *
   * @param {Object} data
   */
  async create(data) {
    const market = new Market()
    market.cnpj = data.cnpj
    market.name = data.name
    market.minValue = data.minValue
    market.picture = 'default.jpg'
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

  /**
   *
   * @param {Number} id
   */
  async read(id){
    const market = await Market.find(id)

    return market
  }

  /**
   *
   * @param {Number} id
   * @param {Object} data
   */
  async update(market, data){
    market.cnpj = data.cnpj || market.cnpj
    market.name = data.name || market.name
    market.minValue = data.minValue || market.minValue
    market.isOpen = data.isOpen == undefined ? market.isOpen: data.isOpen
    market.picture = data.picture || market.picture
    market.phone = data.phone || market.phone

    try{
      await market.save()
      return market
    }
    catch(err) {
      console.log(err)
      return null
    }
  }

  async list() {
    const markets = await Market.all()

    return markets
  }
}

module.exports = MarketRepository
