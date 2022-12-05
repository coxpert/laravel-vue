import { createRouter, createWebHistory } from 'vue-router'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// Middlewares
import { Middleware, AuthMiddleware, NotAuthMiddleware } from '../middleware'

// Layout components
import Main from '../components/layout/Main.vue'
import Layout from '../components/layout/Layout.vue'

// Public components
import Login from '../components/public/auth/Login.vue'

// Authorized components
import Home from '../components/Home.vue'

// Error components
import Errors from '../components/Errors.vue'

// Other
import store, { Actions } from '../store'

export const ROUTE_NAMES = {
    HOME: 'home',
    LOGIN: 'login',
    // ERRORS
    ERROR: 'error',
    ERROR_403: 'error_forbidden',
}

export const routesConfig = [
    {
        path: '',
        component: Main,
        children: [
            {
                path: '/error',
                name: ROUTE_NAMES.ERROR,
                component: Errors,
                children: [
                    {
                        path: 'forbidden',
                        name: ROUTE_NAMES.ERROR_403,
                        component: Errors,
                    },
                ],
            },
            {
                path: '/login',
                name: ROUTE_NAMES.LOGIN,
                component: Login,
                meta: { middleware: [NotAuthMiddleware] },
            },
            {
                path: '',
                component: Layout,
                children: [
                    {
                        path: '',
                        name: ROUTE_NAMES.HOME,
                        component: Home,
                    }
                ],
                meta: { middleware: [AuthMiddleware] },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routesConfig,
})

let authChecked = false
router.beforeEach(
    async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
        if (!authChecked) {
            await store.dispatch(Actions.CHECK_AUTH)
            authChecked = true
        }

        if (!to.name) {
            await router.push({ name: ROUTE_NAMES.HOME })
        }
        const middleware = new Middleware(next, to, from)
        const route = await middleware.handle()
        route ? next(route) : next()
    }
)

// @ts-ignore
export default { ...router }
