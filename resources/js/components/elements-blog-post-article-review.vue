<template>
    <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">{{ data.created_at }}</span>
            <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">{{ data.category.name }}</a>
        </div>
        <div class="mt-2">
            <a class="text-2xl text-gray-700 font-bold hover:underline" href="#">{{ data.title }}</a>
            <p class="mt-2 text-gray-600">{{ data.title }}</p>
        </div>
        <div class="flex justify-between items-center mt-4">
            <button class="text-blue-500 hover:underline" @click="clickPost">Read more</button>
            <div>
                <a class="flex items-center" href="#">
                    <h1 class="text-gray-700 font-bold hover:underline">{{ data.user.name }}</h1>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        methods:{

            clickPost() {
                this.$emit('clickPost', this.data);
            }
        }
    }

</script>
