import { createRouter, createWebHistory } from "vue-router";
import UsersList from "../js/pages/UsersList.vue";
import User from "../js/pages/User.vue";
import Post from "../js/pages/Post.vue";
import PostsList from "../js/pages/PostsList.vue";
import Check from "../js/pages/Check.vue";
import Login from "../js/pages/Login.vue";
import Registration from "../js/pages/Registration.vue";
import UserCreate from "../js/pages/UserCreate.vue";

const routes = [
    {
        path: '/',
        name: 'Check',
        component: Check
    },
    {
        path: '/posts-list',
        name: 'PostsList',
        component: PostsList
    },
    {
        path: '/post/:slug',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/user/login',
        name: 'LoginPage',
        component:  Login,
    },
    {
        path: '/user/register',
        name: 'Registration',
        component: Registration,
    },
    {
        path: '/users-list',
        name: 'UsersList',
        component: UsersList,
    },
    {
        path: '/users-list',
        name: 'AddUser',
        component: UserCreate,
    },
    {
        path: "/user/:slug",
        name: "User",
        component: User,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;
