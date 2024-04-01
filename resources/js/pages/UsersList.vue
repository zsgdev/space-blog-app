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
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users.data" :key="user.id" @click="handleClickPost(user)">
<!--                    <td class="border px-4 py-2">{{ user.id }}</td>-->
                    <td class="border px-4 py-2">{{ user.name }}</td>
                    <td class="border px-4 py-2">{{ user.email }}</td>
                    <td class="border px-4 py-2">{{ user.email }}</td>
                </tr>
                </tbody>
            </table>
            <div class="mt-8">
                <Pagination :currentPage="currentPage" :totalPages="totalPages"
                            @pageChange="fetchPosts"></Pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from "../components/navigation-navbar-simple.vue";
import Pagination from "@/components/elements-pagination.vue";

export default {
    components: {Pagination, Navbar},
    data() {
        return {
            currentPage: 1,
            totalPages: 0,
            users: [
                // {id: 1, name: "John Doe", email: "john@example.com"},
                // {id: 2, name: "Jane Smith", email: "jane@example.com"},
                // // Добавьте других пользователей, если необходимо
            ]
        };
    },
    methods: {
        async fetchUsers(page = 1) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users?page=${page}`);
                const data = response.data
                this.users = JSON.parse(JSON.stringify(data.users))
                this.currentPage = this.users.current_page;
                this.totalPages = this.users.last_page;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        handleClickPost(user) {
            console.log(user)
            setTimeout(() => {
                this.$router.push({ name: 'User', params: { id: user.id }});
            }, 2000);
        },
    },
    mounted() {
        this.fetchUsers()
        // axios.get('/api/user').then((res) => {
        //     console.log(res)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
};
</script>
