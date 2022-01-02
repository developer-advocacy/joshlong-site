export class Appearance {

    constructor(date, title, descriptionHtml) {
        this.date = date;
        this.title = title;
        this.html = descriptionHtml;
        if ((typeof this.date) !== 'string') {
            this.day = this.date.getUTCDate();
            this.year = this.date.getUTCFullYear();
            this.month = this.date.toLocaleString('default', {month: 'short'})
        }

    }
}