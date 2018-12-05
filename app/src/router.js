import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Play from './components/Play'
import History from './components/History'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    },
    {
      path: '/history',
      name: 'history',
      component: History
    }
  ]
})
