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
    return `${fields[0]}/${fields[2]}/${fields[1]}`
  }

  return {
    name: faker.username(),
    email: faker.email(),
    picture: 'default.jpg',
    password: faker.password(),
    phone: faker.phone(),
    date_of_birth: formateDate(faker.birthday({string:true})),
    level: 1
  }
})

