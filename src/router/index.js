import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Authors from '@/components/Authors'
import Books from '@/components/Books'
import Categories from '@/components/Categories'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
