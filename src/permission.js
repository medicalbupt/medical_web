import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log("有hasToken")
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name
      // 解决刷新完回登录页问题
      let hasGetUserInfo=''
      if (sessionStorage.getItem("userreallyname")!= null) {
        hasGetUserInfo= sessionStorage.getItem("userreallyname")
        console.log("sessionStorage的userreallyname",sessionStorage.getItem("userreallyname"));
      }

      // console.log("hasGetUserInfo",store.getters.name)
      // console.log("phonenumber",store.getters.phonenumber)
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          console.log("进入没有hasGetUserInfo")
          // get user info
          await store.dispatch('user/getInfo')
          console.log("分发getInfo完成")

          next()
        }
        catch (error) 
        {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }

  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
