<template>
    <div>
        <navbar></navbar>
        <div class="px-6 py-8">
            <div class="flex justify-between container mx-auto">
                <div class="w-full lg:w-8/12">
                    <div class="flex items-center justify-between">
                        <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
                        <post-filter></post-filter>
                    </div>
                    <div class="mt-6" v-if="posts && posts.data">
                        <div v-for="post in posts.data" :key="post.id">
                            <post @clickPost="handleClickPost" :data="post"></post>
                        </div>
                    </div>
                    <div class="mt-8">
                        <Pagination :currentPage="currentPage" :totalPages="totalPages"
                                    @pageChange="fetchPosts"></Pagination>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import Navbar from "../components/navigation-navbar-simple.vue";
import PostFilter from "../components/elements-select-option.vue";
import Post from "../components/elements-blog-post-article-review.vue";
import Pagination from "../components/elements-pagination.vue";

export default {
    components: {
        Navbar,
        PostFilter,
        Post,
        Pagination,
    },
    data() {
        return {
            posts: [],
            currentPage: 1,
            totalPages: 0
        }
    },
    mounted() {
        this.fetchPosts()
    },
    methods: {
        async fetchPosts(page = 1) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`);
                const data = response.data
                this.posts = JSON.parse(JSON.stringify(data.posts))
                this.currentPage = this.posts.current_page;
                this.totalPages = this.posts.last_page;
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        handleClickPost(post) {
            console.log(post)

            setTimeout(() => {
                this.$router.push({ name: 'Post', params: { id: post.id }});
            }, 2000);


            // window.location.href = `/post/${post.id}`;

            // this.router.push({name:'Login'});
            // this.$router.push("/#/home");
        },
    }
}

</script>
