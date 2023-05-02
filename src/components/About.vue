<template>

    <Zone class="abstracts">
        <h1> About  </h1>
        <div v-html="html"></div>
    </Zone>
</template>
<style>
.abstracts a {
    color: var(--gray-400);
}


</style>
<script>
import Zone from "./Zone";
import {ContentService} from "@/content-service";

export default {
    name: 'About',
    components: {Zone},
    props: {},

    async created() {
        const cs = new ContentService()
        this.html = await cs.about()
        console.log('loaded the html for the about page ')
    },
    data() {
        return {
            html: ''
        }
    }
}
</script>