import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true
},

{
    path: '/404',
    component: () =>
        import('@/views/404'),
    hidden: true
},

{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: () =>
            import('@/views/dashboard/dashboard.vue'),
        meta: { title: '门户', icon: 'dashboard', affix: true }
    },
    {
        path: "myinfomation",
        component: () =>
            import("@/views/userlist/myinfomation/mylist.vue"),
        name: "myinfomation",
        meta: { title: "个人信息", icon: "form" },
        hidden: true,
    }
    ]
},



{
    path: "",
    component: Layout,
    redirect: "/patient-infomation",
    name: "TestDemo2",
    children: [
        // {
        //   path: "patient-infomation",
        //   component: () => import("@/views/patient/patient-infomation.vue"),
        //   name: "patient-infomation",
        //   meta: { title: "用户信息列表", icon: "excel" },
        // },
        {
            path: "patient",
            component: () =>
                import("@/views/patient/patient.vue"),
            name: "patient",
            meta: { title: "患者库", icon: "form" },
        },

        // {
        //   path: '/patient/add',
        //   component: () => import("@/views/patient/ch/Add.vue")
        // }
        {
            path: 'add',
            component: () =>
                import("@/views/patient/Add.vue"),
            name: "patient_add",
            hidden: true,
            meta: { title: "患者录入", icon: "form" },
        },
        {
            path: 'patientmation',
            component: () =>
                import("@/views/patient/patientmation.vue"),
            name: "patientmation",
            hidden: true,
            meta: { title: "患者详细信息", icon: "form" },
        },
        {
            path: 'quickadd',
            component: () =>
                import("@/views/patient/quickadd.vue"),
            name: "quickadd",
            hidden: true,
            meta: { title: "快速录入", icon: "form" },
        },
        {
            path: 'patientinfoedit',
            component: () =>
                import("@/views/patient/quickadd.vue"),
            name: "patientinfoedit",
            hidden: true,
            meta: { title: "编辑患者信息", icon: "form" },
        },
        {
            path: 'addconsultationnew',
            component: () =>
                import("@/views/patient/quickadd.vue"),
            name: "addconsultationnew",
            hidden: true,
            meta: { title: "添加复诊", icon: "form" },
        },
        {
            path: 'editconsultationnew',
            component: () =>
                import("@/views/patient/quickadd.vue"),
            name: "editconsultationnew",
            hidden: true,
            meta: { title: "编辑复诊信息", icon: "form" },
        },
        {
            path: 'addconsultation',
            component: () =>
                import("@/views/patient/addconsultation.vue"),
            name: "addconsultation",
            hidden: true,
            meta: { title: "添加复诊", icon: "form" },
        },
        {
            path: 'consultmation',
            component: () =>
                import("@/views/patient/consultmation.vue"),
            name: "consultmation",
            hidden: true,
            meta: { title: "复诊详情", icon: "form" },
        },
        {
            path: 'consultmationnew',
            component: () =>
                import("@/views/patient/patientmation.vue"),
            name: "consultmationnew",
            hidden: true,
            meta: { title: "复诊详情", icon: "form" },
        }
    ]

},


{
    path: "/user",
    component: Layout,
    redirect: "user-infomation",
    name: "Example1",
    children: [{
        path: "userlist",
        component: () =>
            import("@/views/userlist/userlist.vue"),
        name: "userlist",
        meta: { title: "用户列表", icon: "list" },
    },
    {
        path: "testview",
        component: () =>
            import("@/views/userlist/children/test.vue"),
        name: "userlist2",
        meta: { title: "test页面", icon: "list" },
        hidden: true,
    }
    ]

},

{
    path: '/commondata',
    component: Layout,
    // redirect: '/commondata',
    children: [{
        path: 'commondata',
        name: 'Commondata',
        component: () =>
            import('@/views/commondata/commondata.vue'),
        meta: { title: '自定义功能', icon: 'clipboard', affix: true }
    },

    ]
},


// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: { title: 'Example', icon: 'el-icon-s-help' },
//   children: [
//     {
//       path: 'table',
//       name: 'Table',
//       component: () => import('@/views/table/index'),
//       meta: { title: 'Table', icon: 'table' }
//     },
//     {
//       path: 'tree',
//       name: 'Tree',
//       component: () => import('@/views/tree/index'),
//       meta: { title: 'Tree', icon: 'tree' }
//     }
//   ]
// },

// {
//   path: '/form',
//   component: Layout,
//   children: [
//     {
//       path: 'index',
//       name: 'Form',
//       component: () => import('@/views/form/index'),
//       meta: { title: 'Form', icon: 'form' }
//     }
//   ]
// },

// {
//   path: '/nested',
//   component: Layout,
//   redirect: '/nested/menu1',
//   name: 'Nested',
//   meta: {
//     title: 'Nested',
//     icon: 'nested'
//   },
//   children: [
//     {
//       path: 'menu1',
//       component: () => import('@/views/nested/menu1/index'), // Parent router-view
//       name: 'Menu1',
//       meta: { title: 'Menu1' },
//       children: [
//         {
//           path: 'menu1-1',
//           component: () => import('@/views/nested/menu1/menu1-1'),
//           name: 'Menu1-1',
//           meta: { title: 'Menu1-1' }
//         },
//         {
//           path: 'menu1-2',
//           component: () => import('@/views/nested/menu1/menu1-2'),
//           name: 'Menu1-2',
//           meta: { title: 'Menu1-2' },
//           children: [
//             {
//               path: 'menu1-2-1',
//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
//               name: 'Menu1-2-1',
//               meta: { title: 'Menu1-2-1' }
//             },
//             {
//               path: 'menu1-2-2',
//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
//               name: 'Menu1-2-2',
//               meta: { title: 'Menu1-2-2' }
//             }
//           ]
//         },
//         {
//           path: 'menu1-3',
//           component: () => import('@/views/nested/menu1/menu1-3'),
//           name: 'Menu1-3',
//           meta: { title: 'Menu1-3' }
//         }
//       ]
//     },
//     {
//       path: 'menu2',
//       component: () => import('@/views/nested/menu2/index'),
//       name: 'Menu2',
//       meta: { title: 'menu2' }
//     }
//   ]
// },

// {
//   path: 'external-link',
//   component: Layout,
//   children: [
//     {
//       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//       meta: { title: 'External Link', icon: 'link' }
//     }
//   ]
// },

// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router