'use strict'

const { test, trait } = use('Test/Suite')('Market')
const Factory = use('Factory')
const Category = use('App/Models/Category')

trait('Test/ApiClient')

class MarketTest {
  constructor(){
    this.jwt = ''
    this.marketId = 0
    this.createSuperUserAndGetJwt()
    this.store()
    this.index()
    this.show()
    this.update()
    this.delete()
  }

  createSuperUserAndGetJwt() {
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

  store() {
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

  index() {
    test('List all markets', async ({ client }) => {
      const response = await client.get('markets').header('accept', 'application/json').end()

      response.assertStatus(200)
    })
  }

  show() {
    test('Show market', async ({ client }) => {
      const marketId = this.marketId
      const response = await client.get(`market/show/${marketId}`)
        .header('accept', 'application/json')
        .end()

      response.assertStatus(200)
      response.assertJSONSubset({
        id: marketId
      })
    })
  }

  update() {
    test('Update market', async ({ client }) => {
      const marketId = this.marketId
      const market = await Factory.model('App/Models/Market').make()
      const address = await Factory.model('App/Models/Address').make()

      const data = market.$attributes
      data.address = address.$attributes
      data.categories = ['Mercado', 'Pizzaria', 'Padaria']

      const response = await client.put(`market/update/${this.marketId}`)
        .send(data)
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
      response.assertJSONSubset({
        id: marketId
      })
    })
  }

  delete() {
    test('Delete market', async ({ client }) => {
      const response = await client.delete(`market/delete/${this.marketId}`)
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }
}

new MarketTest()
