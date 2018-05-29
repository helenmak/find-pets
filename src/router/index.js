import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage,
      redirect: '/map',
      children: [
        {
          path: '/map',
          name: 'map',
          component: Map
        }
      ]
    }
  ]
})
