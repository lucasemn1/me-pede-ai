const Address = use('App/Models/Address')

class AddressRepository {
  /**
   *
   * @param {Object} data
   */
  async create(data) {
    const address = new Address()
    address.number = data.number
    address.complement = data.complement
    address.neighborhood = data.neighborhood
    address.city = data.city
    address.uf = data.uf
    address.country = data.country
    address.cep = data.cep
    address.street = data.street

    try{
      await address.save()
      return address
    }
    catch (err) {
      return null
    }
  }

  /**
   *
   * @param {Number} id
   */
  async read(id) {
    const address = await Address.find(id)

    return address
  }

  /**
   *
   * @param {Number} id
   * @param {Object} data
   */
  async update(id, data){
    const address = await this.read(id)

    address.number = data.number || address.number
    address.complement = data.complement || address.complement
    address.neighborhood = data.neighborhood || address.neighborhood
    address.city = data.city || address.city
    address.uf = data.uf || address.uf
    address.country = data.country || address.country
    address.cep = data.cep || address.cep
    address.street = data.street || address.street

    try{
      await address.save()
      return address
    }
    catch(err) {
      console.log(err)
      return null
    }
  }
}

module.exports = AddressRepository
