import axios from 'axios'
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../components/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign_up',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {

      return import( /* webpackChunkName: "about" */ '../components/sign_up.vue')
    }
  }, {
    path: '/login',
    name: 'Sign_in',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import( /* webpackChunkName: "about" */ '../components/sign_in.vue')
    }
  },
  {
    path: '/why-us',
    name: 'Why-us',
    component: function () {
      return import('../components/why-us.vue')
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: function () {
      return import('../components/blog.vue')
    }
  }, {
    path: '/forget_password',
    name: 'Forget_password',
    component: function () {
      return import('../components/forget_password.vue')
    }
  }, {
    path: '/admin/blog',
    name: 'Admin',
    component: function () {
      return import('../views/admin.vue')
    },
    children: [{
      path: '/admin/blog',
      name: 'AdminBlog',
      component: function () {
        return import('../views/adminBlog.vue')
      }
    }, {
      path: '/admin/crypto',
      name: 'AdminCrypto',
      component: function () {
        return import('../views/adminCrypto.vue')
      }
    }, {
      path: '/admin/closed',
      name: 'AdminEmpty',
      component: function () {
        return import('../views/adminEmpty.vue')
      }
    }]
  },
  {
    path: '/course',
    name: 'Course_intro',
    component: function () {
      return import('../courses/course_intro.vue')
    },
    beforeEnter: (to, from, next) => {
      // let token = localStorage.getItem('accessToken')
      let config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      axios('api/token', config).then(res => {

        if (res.statusText === "OK") {
          next()
        } else {
          next('/login')
        }
      }).catch(err => {
        next('/login')
      })

    },
    children: [{
        path: '/course/crypto',
        name: 'Crypto_course',
        component: () => import('../courses/crypto_course.vue')
      },
      {
        path: '/course/forex',
        name: 'Forex_course',
        component: function () {
          return import('../courses/forex_course.vue')
        }
      }, {
        path: '/course/web',
        name: 'Web_course',
        component: () => import('../courses/web_course.vue')
      }, {
        path: '/course/graphic',
        name: 'Graphic',
        component: () => import('../courses/graphic_course.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router