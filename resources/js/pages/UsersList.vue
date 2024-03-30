<template>
    <div>
        <navbar></navbar>
        <div class="container mt-6 mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Users List</h1>
            <router-link :to="{ name: 'AddUser' }" class="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </router-link>
        </div>
        <div class="overflow-x-auto">
            <table class="table-auto w-full border-collapse">
                <thead>
                <tr>
                    <th class="px-4 py-2 bg-gray-200 text-left">ID</th>
                    <th class="px-4 py-2 bg-gray-200 text-left">Name</th>
                    <th class="px-4 py-2 bg-gray-200 text-left">Email</th>
                    <!-- Добавьте другие столбцы, если необходимо -->
                </tr>
                </thead>
                <tbody>
                <!-- Здесь вы можете использовать v-for для отображения списка пользователей -->
                <tr v-for="user in users" :key="user.id">
                    <td class="border px-4 py-2">{{ user.id }}</td>
                    <td class="border px-4 py-2">{{ user.name }}</td>
                    <td class="border px-4 py-2">{{ user.email }}</td>
                    <router-link :to="{name: 'User', params: {slug: 'User template'}}"></router-link>
                    <!-- Добавьте другие столбцы, если необходимо -->
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Navbar from "../components/navigation-navbar-simple.vue";

export default {
    components: {Navbar},
    data() {
        return {
            users: [
                {id: 1, name: "John Doe", email: "john@example.com"},
                {id: 2, name: "Jane Smith", email: "jane@example.com"},
                // Добавьте других пользователей, если необходимо
            ]
        };
    },
    mounted() {
        axios.get('/api/user').then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
};
</script>
