import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import AccountOptions from '../components/AccountOptions.vue'
import HelloWorld from '../components/HelloWorld.vue'
import RecenltyUsed from '../components/RecenltyUsed.vue'
import About from '../views/About.vue'
import LoginPage from '../components/LoginPage.vue'
import SignUp from '../components/SignUpPage.vue'
import SettingUpPage from '../components/SettingUpPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/accountOptions',
    name: 'AccountOptions',
    component: AccountOptions
  },
  {
    path: '/recenltyUsed',
    name: 'RecenltyUsed',
    component: RecenltyUsed
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/signUp',
    name: 'SignUpPage',
    component: SignUp
  },
  {
    path: '/settingUpPage',
    name: 'SettingUpPage',
    component: SettingUpPage
  }
]

const router = new VueRouter({
  routes
})

export default router
