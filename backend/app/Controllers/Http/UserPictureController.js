'use strict'
const PictureRepository = use('App/Repository/PictureRepository')
const Helpers = use('Helpers')

class UserPictureController {
  constructor() {
    this.pictureRepository = new PictureRepository('users')
  }

  /**
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user = await auth.getUser()

    if( user.picture !== 'default.jpg' ) {
      return response.status(500).json({ message: 'You already has a picture' })
    }

    const picture = await request.file('picture', {
      types: ['jpg', 'jpeg', 'png'],
      size: '3mb'
    })

    const pictureName = await this.pictureRepository.create(picture)

    if(!pictureName) {
      return response.status(500).json({ message: "picture wasn't saved." })
    }

    user.picture = pictureName
    await user.save()

    return response.status(200).json({ pictureName })
  }

  /**
   * @param {Response} ctx.response
   */
  async show({ response, auth }) {
    const user = await auth.getUser()

    return response.status(200).download(Helpers.tmpPath(`uploads/users/${user.picture}`))
  }

  /**
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, auth }) {
    const user = await auth.getUser()

    if( user.picture === 'default.jpg' ) {
      return response.status(500).json({ message: "You currently don't have any photos. Please send a photo first." })
    }

    const picture = await request.file('picture', {
      types: ['jpg', 'jpeg', 'png'],
      size: '3mb'
    })

    const pictureName = await this.pictureRepository.update(user.picture, picture)

    if( !pictureName ) {
      return response.status(500).json({ message: 'The picture could not be changed.' })
    }

    return response.status(200).json()
  }

  /**
   *
   * @param {Response} ctx.response
   */
  async delete({ response, auth }) {
    const user = await auth.getUser()

    if( user.picture === 'default.jpg' ){
      return response.status(404).json({ message: 'Image not found. Please send a picture first.' })
    }
    if( !(await this.pictureRepository.delete(user.picture)) ) {
      return response.status(500).json({ message: "Couldn't delete the image" })
    }

    user.picture = 'default.jpg'
    await user.save()

    return response.status(200).json()
  }
}

module.exports = UserPictureController
