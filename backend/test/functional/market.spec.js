'use strict'

const { test, trait } = use('Test/Suite')('Market')
const Factory = use('Factory')
const Category = use('App/Models/Category')

trait('Test/ApiClient')

class MarketTest {
  constructor(){
    this.jwt = ''
    this.createSuperUserAndGetJwt()
    // this.index()
    this.store()
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
      // console.log(response)
    })
  }

  index() {
    test('List all markets', async ({ client }) => {
      const response = await client.get('markets').header('accept', 'application/json').end()
      console.log(response)
    })
  }
}

new MarketTest()
