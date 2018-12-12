import Vue from 'vue'
import Router from 'vue-router'
// Views
import Home from './views/Home'
// Components
import Account from './components/Account'
import Play from './views/Play'
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
      path: '/account/:userId',
      name: 'account',
      component: Account,
    },
    {
      path: '/history/:userId',
      name: 'history',
      component: History
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    },
  ]
})
