import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './home.vue';
import Posts from './posts.vue';
import Single from './single.vue';

Vue.use(VueRouter);

//const baseUrl = "http://jsonplaceholder.typicode.com";

const routes = [
  {name: "home", path: '/', component: Home},
  {name: "posts", path: '/posts', component: Posts},
  {name: "single", path: '/single/:id', component: Single},
]

var router = new VueRouter({
  mode: 'history',
  routes,
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
