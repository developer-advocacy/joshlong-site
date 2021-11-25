export class Post {
    constructor(date, title, path, html, hiu) {
        this.date = date;
        this.title = title;
        this.html = html;
        this.path = path
        this.heroImageUrl = hiu;
        this.date = new Date(date)
        this.day = this.date.getUTCDate();
        this.year = this.date.getUTCFullYear();
        this.month = this.date.toLocaleString('default', {month: 'short'})
    }
}
