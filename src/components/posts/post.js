export class Post {
    constructor(date, title, url, descriptionHtml) {
        this.date = date;
        this.title = title;
        this.html = descriptionHtml;
        this.heroImageUrl = url;
        this.day = this.date.getUTCDate();
        this.year = this.date.getUTCFullYear();
        this.month = this.date.toLocaleString('default', {month: 'short'})//.substr(0, 3);
    }
}
