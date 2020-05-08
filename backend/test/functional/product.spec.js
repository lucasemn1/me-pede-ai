'use strict'

const { test, trait } = use('Test/Suite')('Product')
const Factory = use('Factory')
const Market = use('App/Models/Market')

trait('Test/ApiClient')

class ProductTest {
  constructor() {
    this.jwt = ''
    this.userId = -1
    this.marketId = -1
    this.productId = -1
    this.storeSuperUserAndGetJwt()
    this.storeMarketAndGettingId()
    this.setMarketAdm()
    this.store()
    this.update()
    this.show()
    this.index()
    this.destroy()
  }

  storeSuperUserAndGetJwt() {
    test('Create a super user and getting jwt', async ({ client }) => {
      const user = await Factory.model('App/Models/User').create()
      user.level = 2
      await user.save()
      this.userId = user.id

      const response = await client.post('/session/login')
        .send({ email: user.email, password: '123' })
        .header('accept', 'application/json')
        .end()

      response.assertStatus(200)

      this.jwt = response.body.token
    })
  }

  storeMarketAndGettingId() {
    test('Store market and getting ID', async ({ client }) => {
      const userId = this.userId
      const market = await Factory.model('App/Models/Market').make()
      const address = await Factory.model('App/Models/Address').make()

      const data = market.$attributes
      data.address = address.$attributes
      data.categories = await Factory.model('App/Models/Category').makeMany(3)

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

  setMarketAdm() {
    test('Setting admin of market', async ({ client }) => {
      const market = await Market.find(this.marketId)
      market.user_id = this.userId
      await market.save()
    })
  }

  store() {
    test('Store product', async ({ client }) => {
      const market_id = this.marketId
      const product = await Factory.model('App/Models/Product').make({ market_id })

      const response = await client.post('product/store')
        .header('accept', 'application/json')
        .header('authorization', `Bearer ${this.jwt}`)
        .header('market_id', this.marketId)
        .send(product.$attributes)
        .end()

      response.assertStatus(201)
      response.assertJSONSubset({ title: product.$attributes.title })

      this.productId = response.body.id
    })
  }

  update() {
    test('Update product', async ({ client }) => {
      const newProduct = await Factory.model('App/Models/Product').make()

      console.log(newProduct)
      const response = await client.put(`product/update/${this.productId}`)
        .header('accept', 'application/json')
        .header('authorization', `Bearer ${this.jwt}`)
        .header('market_id', this.marketId)
        .send(newProduct.$attributes)
        .end()

      console.log(response.body)
      response.assertStatus(200)
    })
  }

  show() {
    test('Show product', async ({ client }) =>  {
      const response = await client.get(`product/${this.productId}`).header('accept', 'application/json').end()
      response.assertStatus(200)
    })
  }

  index() {
    test('List products', async ({ client }) => {
      const response = await client.get(`/products?market=${this.marketId}`).end()

      response.assertStatus(200)
    })
  }

  destroy() {
    test('Delete product', async ({ client }) => {
      const response = await client.delete(`product/delete/${this.productId}`)
        .header('accept', 'application/json')
        .header('authorization', `Bearer ${this.jwt}`)
        .header('market_id', this.marketId)
        .end()

      console.log(response)
    })
  }
}

new ProductTest()
