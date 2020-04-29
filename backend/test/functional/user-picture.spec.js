'use strict'

const { test, trait } = use('Test/Suite')('User Picture')
const Factory = use('Factory')
const Helpers = use('Helpers')

trait('Test/ApiClient')

class UserPictureTest {
  constructor() {
    this.jwt = ''
    this.createUserAndGetJwt()
    this.store()
    this.show()
    this.update()
    this.delete()
  }

  createUserAndGetJwt() {
    test('Create a user and getting jwt', async ({ client }) => {
      const user = await Factory.model('App/Models/User').create()
      await user.save()

      const response = await client.post('/session/login')
        .send({ email: user.email, password: '123' })
        .header('accept', 'application/json')
        .end()

      response.assertStatus(200)

      this.jwt = response.body.token
    })
  }

  store() {
    test('Store user picture', async ({ client }) => {
      const response = await client.post(`/user/store/picture`)
        .attach('picture', Helpers.tmpPath('uploads/users/test_default.png'))
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }

  show() {
    test('Show user picture', async ({ client }) => {
      const response = await client.get(`/user/picture`)
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }

  update() {
    test('Update user picture', async ({ client }) => {
      const response = await client.put(`user/update/picture`)
        .attach('picture', Helpers.tmpPath('uploads/users/test_default_update.png'))
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }

  delete() {
    test('Delete user picture', async ({ client }) => {
      const response = await client.delete(`user/delete/picture`)
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${this.jwt}`)
        .end()

      response.assertStatus(200)
    })
  }
}

new UserPictureTest()
