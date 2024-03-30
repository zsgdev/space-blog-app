<template>
    <div>
        <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div class="w-full p-6 m-auto bg-white border-t border-gray-600 rounded shadow-lg shadow-gray-800/50 lg:max-w-md">
                <h1 class="text-3xl font-semibold text-center text-gray-700">Space<span class="text-blue-500"> Agency</span></h1>

                <form class="mt-6" @submit.prevent="login">
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
                        <label for="password" class="block text-sm text-gray-800">Password</label>
                        <input type="password"
                               v-model="formData.password"
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
                            Login
                        </button>
                    </div>
                </form>
                <p class="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account?
                    <router-link to="user/register" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">Sign up</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
export default {
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            formErrors: {}
        };
    },
    methods: {
        login() {
            this.formErrors = {};
            if (!this.formData.email) {
                this.formErrors.email = 'Email is required';
            }
            if (!this.formData.password) {
                this.formErrors.password = 'Password is required';
            }
            if (Object.keys(this.formErrors).length === 0) {

                console.log('Form submitted:', this.formData);
                // axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/login', {
                        email: this.formData.email,
                        name: this.formData.name,
                        password: this.formData.password
                    }).then(res => {
                        localStorage.setItem('authenticated', 'true')
                        toast.success('Вы вошли!', {
                            timeout: 3000,
                        });
                        setTimeout(() => {
                            this.$router.push('/users-list');
                        }, 3000);
                    }).catch( err => {
                        console.log(err.response)
                    })

            } else {
                console.log('Form validation failed');
            }
        }
    }
};
</script>
