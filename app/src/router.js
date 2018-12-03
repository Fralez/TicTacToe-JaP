import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Rules from './views/Rules'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules
    }
  ]
})
