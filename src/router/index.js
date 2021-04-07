import Vue from 'vue';
import VueRouter from "vue-router";

//懒加载组件
const Home = ()=> import('@/views/home/Home')
const Category = ()=> import('../views/category/Category')
const Cart = ()=> import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
//抽取routes属性
const routes = [
  {
    path: '/',
    redirect: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]



const router = new VueRouter({
  routes,
  mode: 'history'

})

//3.导出路由对象,然后去main.js里面进行挂载
export default router
