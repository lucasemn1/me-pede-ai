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
  async update(id, data){
    const market = await this.read(id)

    console.log(market.name)
    market.cnpj = data.cnpj || market.cnpj
    market.name = data.name || market.name
    market.min_value = data.min_value || market.min_value
    market.is_open = data.is_open == undefined ? market.is_open: data.is_open
    market.photo = data.photo || market.photo
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
}

module.exports = MarketRepository
