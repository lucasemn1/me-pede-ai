'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  /**
   * @param {String} date
   * @returns {Array}
   */
  function formateDate(date) {
    const fields = date.split('/')
    fields.reverse()

    if(fields[1]<10) {
      fields[1] = `0${fields[1]}`
    }
    if(fields[2]<10) {
      fields[2] = `0${fields[2]}`
    }

    return `${fields[0]}/${fields[2]}/${fields[1]}`
  }

  return {
    name: faker.username(),
    email: faker.email(),
    picture: 'default.jpg',
    password: '123',
    phone: faker.phone(),
    date_of_birth: formateDate(faker.birthday({string:true})),
    level: 1
  }
})

Factory.blueprint('App/Models/Address', (faker) => {
  return {
    number: faker.integer({min: 0, max: 999}),
    complement: 'casa',
    neighborhood: faker.street(),
    city: faker.city(),
    uf: faker.state(),
    country: faker.country(),
    postcode: faker.postcode(),
    street: faker.street()
  }
})
