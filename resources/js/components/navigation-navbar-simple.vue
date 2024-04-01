<template>
    <nav class="bg-white px-6 py-4 shadow">
        <div class="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
            <div class="flex justify-between items-center">
                <div>
                    <router-link to="/" class="text-gray-800 text-xl font-bold md:text-2xl">
                        Space<span class="text-blue-500"> Agency</span>
                    </router-link>
                </div>
                <div>
<!--                    <button type="button" @click="isOpen = !isOpen" class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden">-->
<!--                        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">-->
<!--                            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>-->
<!--                        </svg>-->
<!--                    </button>-->
                </div>
            </div>
            <div class="flex flex-col md:flex-row md:-mx-4">
                <router-link v-if="isLogged" :to="{name: 'Login'}" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Login</router-link>
                <router-link v-if="isLogged" :to="{name: 'Registration'}" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Registration</router-link>
                <router-link to="/" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Posts List</router-link>
                <router-link to="/users-list" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Users List</router-link>
                <a @click.prevent="logout" href="#">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            isOpen: false,
            isLogged: false,
        }
    },
    created() {
        this.isLogged = !!window.localStorage.getItem('authenticated');
    },
    methods: {
        getAuthLocalStorage() {
            this.localStorage.getItem('authenticated')
        },
        logout() {
            axios.post('/api/logout')
                .then(res => {
                    localStorage.removeItem("authenticated");
                    toast.success('Пока!', {
                        timeout: 3000,
                    });
                    setTimeout(() => {
                        this.$router.push('/users-list');
                    }, 3000);
                })
        }
    }
}
</script>
