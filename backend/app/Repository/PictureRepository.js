const Helpers = use('Helpers')
const { unlink } = require('fs')

class PictureRepository {
  constructor(path) {
    this.path = path
  }
  async pictureValidator(picture) {

  }

  async create(picture) {
    const pictureName = `${new Date().getTime()}.${picture.extname}`

    await picture.move(Helpers.tmpPath(`uploads/${this.path}`), {
      name: pictureName,
      overwrite: true
    })

    return picture.moved() ? pictureName : null
  }

  async update(pictureName, picture) {
    await picture.move(Helpers.tmpPath(`uploads/${this.path}`), {
      name: pictureName,
      overwrite: true
    })

    return picture.moved() ? pictureName : null
  }

  async delete(pictureName) {
    let result;
    await unlink(Helpers.tmpPath(`uploads/${this.path}/${pictureName}`), (err) => {
      if (err) {
        result = false
      }
    })
    result = true
    return result
  }
}

module.exports = PictureRepository
