const Helpers = use('Helpers')

class PictureRepository {
    constructor(path){
        this.path = path
    }

    async create(photo) {
        const photoName = `${new Date().getTime()}.${photo.extname}`
        
        await photo.move(Helpers.tmpPath(`uploads/${this.path}`), {name:photoName})

        if(!photo.moved()) {
            console.log()
        }

        return photo.moved() ? photoName: null
    }
}

module.exports = PictureRepository