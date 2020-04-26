'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('Test/ApiClient')

class UserTest {
  constructor() {
    this.userEmail = ''
    this.token = ''
    this.store()
    this.login()
    this.update()
    this.index()
    this.destroy()
  }

  store() {
    test('Store user', async ({ client }) => {
      const user = await Factory.model('App/Models/User').make()
      const address = await Factory.model('App/Models/Address').make()

      const data = user.$attributes
      data.address = address.$attributes

      this.userEmail = data.email

      const response = await client.post('/user/store')
        .send(data)
        .header('accept', 'application/json')
        .end()

      response.assertStatus(200)
      response.assertJSONSubset({
        email: data.email
      })
    })
  }

  login() {
    test('Login test', async ({client}) => {
      const userEmail = this.userEmail

      //Solicitando o token
      const response = await client.post('/session/login')
        .send({email: userEmail, password: '123'})
        .header('accept', 'application/json')
        .end()

      response.assertStatus(200)
      this.token = response.body.token
    })
  }

  update() {
    test('Update user', async ({ client }) => {
      const token = this.token

      //Criando os novos dados que substituirão os antigos
      const user = await Factory.model('App/Models/User').make()
      const address = await Factory.model('App/Models/Address').make()

      const data = user.$attributes
      data.address = address.$attributes
      this.userEmail = data.email

      //Atualizando
      const response = await client.put('/user/update')
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${token}`)
        .send(data)
        .end()

      response.assertStatus(200)
      response.assertJSONSubset({
        email: data.email
      })
    })
  }

  index() {
    test('Do not list users for normal users', async ({ client }) => {
      const response = await client.get('/users')
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.token}`)
        .end()

      response.assertStatus(401)
    })
  }

  destroy() {
    test('Destroy user', async ({ client }) => {
      const response = await client.delete('/user/destroy')
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.token}`)
        .end()

      response.assertStatus(200)
      this.userEmail = ''
      this.token = ''
    })
  }
}

new UserTest()




