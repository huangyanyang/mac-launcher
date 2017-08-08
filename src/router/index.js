import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hello2 from '@/components/Hello2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Hello',
      component: Hello
    },
    {
      path: '/hello2',
      // name: 'Hello',
      component: Hello2
    }
  ]
})
