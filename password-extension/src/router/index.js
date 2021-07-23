import Vue from 'vue'
import VueRouter from 'vue-router'
import AccountOptions from '../components/AccountOptions.vue'
import HelloWorld from '../components/HelloWorld.vue'
import RecenltyUsed from '../components/RecenltyUsed.vue'
import About from '../views/About.vue'
import LoginPage from '../components/LoginPage.vue'
import SignUp from '../components/SignUpPage.vue'
import SettingUpPage from '../components/SettingUpPage.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
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
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  }
]

const router = new VueRouter({
  routes
})

export default router
