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
    // {
    //     path: '/',
    //     name: 'Check',
    //     component: Check
    // },
    {
        path: '/',
        name: 'PostsList',
        component: PostsList
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/user/login',
        name: 'Login',
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
        path: "/user/:id",
        name: "User",
        component: User,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const authenticated = localStorage.getItem("authenticated");

    if (to.meta.requiresGuest && authenticated) {
        return {
            name: "Dashboard",
        };
    } else if (to.meta.requiresAuth && !authenticated) {
        return {
            name: "Login",
        };
    }
});

export default router;
