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
    user.picture = 'default.jpg'
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

  async update(user, data){
    user.name = data.name || user.name
    user.email = data.email || user.email
    user.picture = 'default.jpg' || user.picture
    user.phone = data.phone || user.phone
    user.date_of_birth = data.date_of_birth || user.date_of_birth

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
