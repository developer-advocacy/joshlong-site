export class Podcast {

    constructor(id, uid, title, description, episodeUri, episodePhotoUri, date) {
        this.id = id
        this.uid = uid
        this.title = title
        this.description = description
        this.episodeUri = episodeUri
        this.episodePhotoUri = episodePhotoUri
        this.date = date
        /*
        console.log('=======================')
        console.log('id ', this.id)
        console.log('title ', this.title)
        console.log('description ', this.description)
        console.log('episodePhotoUri ', this.episodePhotoUri)
        console.log('episodeUri ', this.episodeUri)
        console.log('uid ', this.uid)
        console.log('date ', this.date)
        */

    }
}