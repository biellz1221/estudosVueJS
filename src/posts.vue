<template>
    <div id="posts">
        <router-link to="/">Homepage</router-link>

        <ul class="lista-quebrada">
            <li v-for="post in posts" :key="post.id">
                <router-link :to="{ name: 'single', params: { id: post.id }}">
                    {{post.id}} - {{post.title}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
const baseUrl = "http://jsonplaceholder.typicode.com";
export default {
    data: function (){
        return {
            posts: [],
        }
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            axios.get(baseUrl + `/posts`).then(response => {
                this.posts = response.data
                //console.log(this.posts);
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>
