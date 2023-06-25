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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '仪表盘',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '仪表盘', icon: 'dashboard'}
    }]
  },

  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: {title: '权限管理', icon: "el-icon-bicycle"},
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: {title: '用户管理', icon: "el-icon-service"}
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: {title: '角色管理', icon: "el-icon-mobile-phone"}
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: {title: '角色添加'},
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: {title: '角色修改'},
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: {title: '角色权限'},
        hidden: true
      },
      {
        path: 'menu/list',
        name: '权限管理',
        component: () => import('@/views/acl/menu/list'),
        meta: {title: '权限管理', icon: "el-icon-truck"}
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: {title: '用户添加'},
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: {title: '用户修改'},
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: {title: '用户角色'},
        hidden: true
      }

    ]
  },


  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '讲师管理',
    meta: {title: '讲师管理', icon: 'el-icon-baseball'},
    children: [
      {
        path: 'list',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: {title: '讲师列表', icon: 'el-icon-basketball'}
      },
      {
        path: 'save',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: {title: '添加讲师', icon: 'el-icon-soccer'}
      },
      {
        path: 'edit/:id',
        name: '修改讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: {title: '修改讲师', noCache: true},
        hidden: true
      },
    ]
  },


  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: {
      title: '课程分类管理', icon: 'el-icon-light-rain'
    },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: {title: '课程分类列表', icon: 'el-icon-sunny'}
      },
      {
        path: 'save',
        name: '导入课程类别',
        component: () => import('@/views/edu/subject/save'),
        meta: {title: '导入课程类别', icon: 'el-icon-moon'}
      },
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: {
      title: '课程管理', icon: 'el-icon-burger'
    },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: {title: '课程列表', icon: 'el-icon-food'}
      },
      {
        path: 'info',
        name: '添加课程',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '添加课程', icon: 'el-icon-chicken'}
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '编辑课程基本信息', noCache: true},
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: {title: '编辑课程大纲', noCache: true},
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: {title: '发布课程', noCache: true},
        hidden: true
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: '轮播图管理',
    meta: {title: '轮播图管理', icon: 'el-icon-dessert'},
    children: [
      {
        path: 'list',
        name: '轮播图列表',
        component: () => import('@/views/edu/banner/list'),
        meta: {title: '轮播图列表', icon: 'el-icon-ice-tea'}
      },
      {
        path: 'save',
        name: '添加轮播图',
        component: () => import('@/views/edu/banner/save'),
        meta: {title: '添加轮播图', icon: 'el-icon-milk-tea'}
      }
    ]
  },

  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/table',
    name: '统计分析',
    meta: {title: '统计分析', icon: 'el-icon-grape'},
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: () => import('@/views/sta/create'),
        meta: {title: '生成数据', icon: 'el-icon-apple'}
      },
      {
        path: 'show',
        name: '图表显示',
        component: () => import('@/views/sta/show'),
        meta: {title: '图表显示', icon: 'el-icon-watermelon'}
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: '订单管理',
    meta: {title: '订单管理', icon: 'el-icon-shopping-cart-full'},
    children: [
      {
        path: 'list',
        name: '订单列表',
        component: () => import('@/views/edu/order/list'),
        meta: {title: '订单列表', icon: 'el-icon-shopping-cart-full'}
      },

    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/table',
    name: '评论管理',
    meta: {title: '评论管理', icon: 'el-icon-chat-dot-square'},
    children: [
      {
        path: 'list',
        name: '评论列表',
        component: () => import('@/views/edu/comment/list'),
        meta: {title: '评论列表', icon: 'el-icon-chat-dot-square'}
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: '文章管理',
    meta: {title: '文章管理', icon: 'el-icon-notebook-2'},
    children: [
      {
        path: 'list',
        name: '文章列表',
        component: () => import('@/views/edu/article/list'),
        meta: {title: '文章列表', icon: 'el-icon-notebook-1'}
      },
      {
        path: 'save',
        name: '添加文章',
        component: () => import('@/views/edu/article/save'),
        meta: {title: '添加文章', icon: 'el-icon-position'}
      },
      {
        path: 'edit/:id',
        name: '编辑文章',
        hidden: true,
        component: () => import('@/views/edu/article/save'),
        meta: {title: '编辑文章', icon: 'el-icon-position'}
      },
      {
        path: 'type',
        name: '文章类别',
        component: () => import('@/views/edu/article/type'),
        meta: {title: '文章类别', icon: 'el-icon-star-off'}
      }
    ]
  },

  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    name: '留言管理',
    meta: {title: '留言管理', icon: 'el-icon-edit'},
    children: [
      {
        path: 'list',
        name: '留言列表',
        component: () => import('@/views/edu/message/list'),
        meta: {title: '留言列表', icon: 'el-icon-edit'}
      }
    ]
  },

  // {
  //   path: '/video',
  //   component: Layout,
  //   redirect: '/video/list',
  //   name: '视频管理',
  //   meta: {title: '视频管理', icon: 'el-icon-video-camera'},
  //   children: [
  //     {
  //       path: 'list',
  //       name: '视频列表',
  //       component: () => import('@/views/edu/video/list'),
  //       meta: {title: '视频列表', icon: 'el-icon-video-camera'}
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
