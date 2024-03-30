<template>
    <div>
        <Navbar></Navbar>
        <div class="mt-6">
            <div class="flex justify-center h-screen">
                <div class="flex flex-col bg-white px-8 py-6 w-full max-w-screen-xl mx-auto rounded-lg shadow-md">
                    <div class="flex justify-between items-center">
                        <!-- Кнопки для изменения и удаления поста -->
                        <!-- <div v-if="postLoaded && userId === (post && post?.user.id)" class="flex items-center">
                            <a href="#">Измен</a>
                            <a href="#">Удал</a>
                        </div> -->
                    </div>
                    <div class="mt-4">
                        <!-- Заголовок поста -->
                        <h2 v-if="postLoaded" class="text-2xl font-bold text-gray-800 mb-2">{{ post && post.post.title }}</h2>
                        <span v-else>Loading post...</span>
                        <!-- Контент поста -->
                        <p v-if="postLoaded" class="text-gray-600 mb-4">{{ post && post.post.content }}</p>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <!-- Имя автора поста -->
                        <div class="flex items-center">
                            <span v-if="postLoaded && post && post.post.user.id" class="text-gray-700 text-sm mr-3">Author: {{ post.post.user.name }}</span>
                            <span v-else>Loading user...</span>
                        </div>
                        <!-- Дата создания поста -->
                        <span v-if="postLoaded" class="font-light text-sm text-gray-600">{{ formatDate(post && post.post.created_at) }}</span>
                        <span v-else class="font-light text-sm text-gray-600">Loading date...</span>
                    </div>
                    <!-- Добавление комментария -->
                    <div class="mt-6 flex items-center">
                        <input v-model="newComment" type="text" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-4" placeholder="Add a comment...">
                        <button @click="addComment" class="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50">+</button>
                    </div>
                    <!-- Отображение комментариев -->
<!--                    <div class="mt-4" v-if="postLoaded && post && post?.comments.length > 0">-->
<!--                        <h3 class="text-lg font-bold mb-2">Comments</h3>-->
<!--                        <ul>-->
<!--                            <li v-for="comment in post.comments" :key="comment.id" class="mb-2">-->
<!--                                <span class="text-gray-700 font-semibold">{{ comment.user.name }}:</span>-->
<!--                                <span class="text-gray-600">{{ comment.comment }}</span>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                    <span v-else-if="postLoaded">No comments yet.</span>-->
<!--                    <span v-else>Loading comments...</span>-->
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Navbar from "../components/navigation-navbar-simple.vue";
// import { postStore } from '../stores/auth';

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            userId: null,
            postLoaded: false,
            post: null,
            newComment: null,
            postId: null
        };
    },
    methods: {
        formatDate(date) {
            if (!date) return "Loading...";
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        async addComment() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/posts/${this.postId}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_id: this.postId,
                        user_id: this.userId,
                        comment: this.newComment // Передача данных комментария в теле запроса
                    })
                });
                const resultComment = await response.json();
                console.log(resultComment);
                // Обработка ответа, если необходимо
            } catch (error) {
                console.error('Error adding comment:', error);
                // Обработка ошибки, если необходимо
            }
        }
    },
    async mounted() {
        this.postId = this.$route.params.id; // Получение параметра маршрута
        console.log(this.postId);

        try {
            // Загрузка данных о посте из маршрута и установка переменной post
            if(this.postId) {
                const response = await fetch(`http://127.0.0.1:8000/api/posts/${this.postId}`);
                const postData = await response.json();
                console.log(postData)
                this.post = postData; // Устанавливаем данные о посте
                console.log(postData)

                this.postLoaded = true;
            } else {

            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    },
};
</script>
