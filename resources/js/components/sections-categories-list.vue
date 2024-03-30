<template>
    <div class="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
        <ul>
            <li v-for="category in categories" :key="category.id">
                <a @click="filterPostsByCategory(category.id)"
                   class="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline cursor-pointer">
                    - {{ category.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: []
        };
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await axios.get('http://your-api-url/categories');
                this.categories = response.data.categories;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        filterPostsByCategory(categoryId) {
            this.$emit('filterByCategory', categoryId);
        }
    },
    mounted() {
        this.fetchCategories();
    }
};
</script>
