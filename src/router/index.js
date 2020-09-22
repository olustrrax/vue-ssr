import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Test from '../components/test.vue'

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Test }
    ]
  })
}