import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

// routes
import home from './components/home/router'
import stake from './components/stake/router'
import market from './components/market/router'
import mine from './components/mine/router'

Vue.use(VueRouter)

const isAuth = () => store.getters.isAuth

const router = new VueRouter({
    routes: [home, stake, market, mine],
    base: process.env.BASE_URL || '/',
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !isAuth()) { 	// Check auth
        next({ name: 'home' })
    } else {
        next()
    }
    if (!to.meta.title) document.title = `${to.meta.name}`
})

export default router