'use strict'

const { test, trait } = use('Test/Suite')('Market Picture')
const Helpers = use('Helpers')
const Factory = use('Factory')
const Category = use('App/Models/Category')

trait('Test/ApiClient')

class MarketPictureTest {
  constructor() {
    this.marketId = 0
    this.jwt = ''
    this.storeSuperUserAndGetJwt()
    this.storeMarket()
    this.store()
    this.show()
    this.update()
    this.delete()
  }

  storeSuperUserAndGetJwt() {
    test('Create a super user and getting jwt', async ({ client }) => {
      const user = await Factory.model('App/Models/User').create()
      user.level = 2
      await user.save()

      const response = await client.post('/session/login')
        .send({ email: user.email, password: '123' })
        .header('accept', 'application/json')
        .end()

      response.assertStatus(200)
      this.jwt = response.body.token
    })
  }

  async createCategories() {
    const mercadoCategory = new Category()
    mercadoCategory.category = 'Mercado'
    await mercadoCategory.save()

    const createdCategories = await Factory.model('App/Models/Category').makeMany(3)
    const categories = []

    createdCategories.map(category => {
      categories.push(category.$attributes.category)
    })

    categories.push(mercadoCategory.category)

    return categories
  }

  storeMarket(){
    test('Store market (Just superusers)', async ({ client }) => {
      const market = await Factory.model('App/Models/Market').make()
      const address = await Factory.model('App/Models/Address').make()

      const data = market.$attributes
      data.address = address.$attributes
      data.categories = await this.createCategories()

      const response = await client.post('/market/store')
        .send(data)
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
      response.assertJSONSubset({
        cnpj: data.cnpj
      })

      this.marketId = response.body.id
    })
  }

  store() {
    test('Store market picture', async ({ client }) => {
      const response = await client.post(`/market/store/picture/${this.marketId}`)
        .attach('picture', Helpers.tmpPath('uploads/markets/test_default.png'))
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }

  show() {
    test('Show market picture', async ({ client }) => {
      const response = await client.get(`/market/${this.marketId}/picture`).header('accept', 'application/json').end()

      response.assertStatus(200)
    })
  }

  update() {
    test('Update market picture', async ({ client }) => {
      const response = await client.put(`market/update/picture/${this.marketId}`)
        .attach('picture', Helpers.tmpPath('uploads/markets/test_default_update.png'))
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }

  delete() {
    test('Delete market picture', async ({ client }) => {
      const response = await client.delete(`market/delete/picture/${this.marketId}`)
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }
}

new MarketPictureTest()
