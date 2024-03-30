<template>
    <div>
        <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div class="w-full p-6 m-auto bg-white border-t border-gray-600 rounded shadow-lg shadow-gray-800/50 lg:max-w-md">
                <h1 class="text-3xl font-semibold text-center text-gray-700">Space<span class="text-blue-500"> Agency</span></h1>

                <form class="mt-6" @submit.prevent="register">
                    <div>
                        <label for="email" class="block text-sm text-gray-800">Email</label>
                        <input type="email"
                               v-model="formData.email"
                               class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                               required
                        >
                        <p v-if="formErrors.email" class="text-xs text-red-500">{{ formErrors.email }}</p>
                    </div>
                    <div class="mt-4">
                        <label for="name" class="block text-sm text-gray-800">Name</label>
                        <input type="text"
                               v-model="formData.name"
                               class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                               required
                        >
                        <p v-if="formErrors.name" class="text-xs text-red-500">{{ formErrors.name }}</p>
                    </div>
                    <div class="mt-4">
                        <label for="password" class="block text-sm text-gray-800">Password</label>
                        <input type="password"
                               v-model="formData.password"
                               class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                               required
                        >
                        <p v-if="formErrors.password" class="text-xs text-red-500">{{ formErrors.password }}</p>
                    </div>
                    <div class="mt-4">
                        <label for="password_confirmation" class="block text-sm text-gray-800">Confirm password</label>
                        <input type="password"
                               v-model="formData.password_confirmation"
                               class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                               required
                        >
                        <p v-if="formErrors.password" class="text-xs text-red-500">{{ formErrors.password }}</p>
                    </div>
                    <div class="mt-6">
                        <button
                            type="submit"
                            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p class="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account?
                    <router-link to="/login" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Login</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            formData: {
                email: '',
                password: '',
                name: '',
                password_confirmation: '',
            },
            formErrors: {}
        };
    },
    methods: {
        getCookie(name) {
            const value = document.cookie;
            const parts = value.split(name);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
        },
        register() {
            this.formErrors = {};
            if (!this.formData.email) {
                this.formErrors.email = 'Email is required';
            }
            if (!this.formData.password) {
                this.formErrors.password = 'Password is required';
            }
            if (Object.keys(this.formErrors).length === 0) {
                axios.post('/api/register', this.formData).then(() => {
                    toast.success('Зареган!', {
                        timeout: 3000,
                    });
                    setTimeout(() => {
                        this.$router.push('/users-list');
                    }, 3000);
                }).catch((error) => {

                })
                // axios.get('/sanctum/csrf-cookie', { withCredentials: true }).then(response => {
                //     const csrfToken = this.getCookie('XSRF-TOKEN=');
                //     axios.post('/register', {
                //         name: this.formData.name,
                //         email: this.formData.email,
                //         password: this.formData.password,
                //         password_confirmation: this.formData.password
                //     }, {
                //         withCredentials: true,
                //         headers: {
                //             Accept: "application/json",
                //             "_token": decodeURIComponent(csrfToken)
                //         }
                //     }).then(res => {
                //         console.log(res.data);
                //         toast.success('Зареган!', {
                //             timeout: 5000,
                //         });
                //         setTimeout(() => {
                //             this.$router.push('/users-list');
                //         }, 3000);
                //
                //     }).catch(error => {
                //         toast.success(`xaasdasd`, {
                //             timeout: 3000,
                //         });
                //         console.error('Error registering user:', error);
                //     });
                // }).catch(error => {
                //     console.error('Error fetching CSRF token:', error);
                // });
            } else {
                console.log('Form validation failed');
            }
        }
    }
};
</script>
