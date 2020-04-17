const Helpers = use('Helpers')
const { unlink } = require('fs')

class PictureRepository {
    constructor(path){
        this.path = path
    }

    async create(photo) {
        const photoName = `${new Date().getTime()}.${photo.extname}`

        await photo.move(Helpers.tmpPath(`uploads/${this.path}`), {
          name:photoName,
          overwrite: true
        })

        if(!photo.moved()) {
            console.log()
        }

        return photo.moved() ? photoName: null
    }

    async update(photoName, photo) {
      try{
        await unlink(Helpers.tmpPath(`uploads/${this.path}/${photoName}`), (err) => {
          if (err) throw err
        })
      }
      catch(err) {
        return null
      }

      await photo.move(Helpers.tmpPath(`uploads/${this.path}`), {
        name:photoName,
        overwrite: true
      })

      if(!photo.moved()) {
          console.log()
      }

      return photo.moved() ? photoName: null
    }

    async delete(photoName){
      try{
        await unlink(Helpers.tmpPath(`uploads/${this.path}/${photoName}`), (err) => {
          if (err) throw err
        })

        return true
      }
      catch(err) {
        return false
      }
    }
}

module.exports = PictureRepository
