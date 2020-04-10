const User = use('App/Models/User')

class UserRepository{
   /**
   *
   * @param {Object} data
   */
  async create(data){
    const user = new User()
    user.name = data.name
    user.email = data.email
    user.password = data.password
    user.picture = 'default'
    user.phone = data.phone
    user.date_of_birth = data.date_of_birth

    try{
      await user.save()
      return user
    }
    catch(err){
      console.log(err)
      return null
    }
  }
}

module.exports = UserRepository
