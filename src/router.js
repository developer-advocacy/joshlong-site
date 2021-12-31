// https://javascript.plainenglish.io/routing-in-vue-3-6f1e48ecd4b1
// https://router.vuejs.org/api/#to
// import App from "./App";
import NotFound from "./components/NotFound";
import {createRouter, createWebHistory} from "vue-router";
import Hero from "./components/Hero";
import About from "./components/About.vue";
import Abstracts from "./components/Abstracts.vue";
import Post from "./components/posts/Post.vue";

const routes = [
    {path: '/', name: 'Home', component: Hero},
    {path: '/about.html', name: 'About', component: About},
    {path: '/jl/blogPost/:postUri', name: 'Post', component: Post, props: true},
    {path: '/abstracts.html', name: 'Abstracts', component: Abstracts},
    {path: '/:catchAll(.*)', name: 'Notfound', component: NotFound},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router
