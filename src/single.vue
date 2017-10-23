<template>
  <div id="single">
        <router-link to="/posts">Lista de Posts</router-link>
        <h3>{{post.title}}</h3>
        {{post.body}}
  </div>
</template>

<script>
import axios from 'axios';
const baseUrl = "http://jsonplaceholder.typicode.com";
export default {
    data: () => ({
        post: null
    }),
    mounted() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            var id = this.$route.params.id;
            axios.get(baseUrl + `/posts/` + id).then(response => {
                this.post = response.data
                console.log(this.post);
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>
