<template>
    <ul class="flex">
        <li class="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg">
            <a class="flex items-center font-bold" @click="prevPage" :disabled="currentPage === 1">Previous</a>
        </li>
        <li v-for="page in displayedPages" :key="page" class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <a class="font-bold" @click="goToPage(page)" :class="{ 'bg-gray-700 text-gray-200': currentPage === page }">{{ page }}</a>
        </li>
        <li class="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
            <a class="flex items-center font-bold" @click="nextPage" :disabled="currentPage === totalPages">Next</a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        displayedPages() {
            const totalDisplayPages = 20;
            const middlePage = Math.floor(totalDisplayPages / 2);
            let startPage = Math.max(this.currentPage - middlePage, 1);
            let endPage = Math.min(startPage + totalDisplayPages - 1, this.totalPages);

            if (endPage - startPage + 1 < totalDisplayPages) {
                startPage = Math.max(endPage - totalDisplayPages + 1, 1);
            }

            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        }
    },
    methods: {
        goToPage(page) {
            if (page !== this.currentPage) {
                this.$emit('pageChange', page);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('pageChange', this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit('pageChange', this.currentPage + 1);
            }
        }
    }
};
</script>
<style scoped>
.pointer-events-none {
    pointer-events: none;
}
</style>
