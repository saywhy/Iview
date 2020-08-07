import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/vendor/Dashboard'], resolve);
const LayoutNot = resolve => require(['@/components/vendor/DashboardNot'], resolve);
Vue.use(Router);

/**
 *
 * permission
 * nav:[1,2,3,4,5,6];
 * aside:[]
 *Among them, the first page does not need permission
 *
 * */

//所有权限通用路由表，如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    component: () => import('@/components/vendor/login/Login')
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/main_content',
    children: [{
      path: '/main_content',
      name: 'main_content',
      component: () => import('@/components/layout/Main')
    }]
  },
  {
    path: '/LayoutNot',
    name: 'LayoutNot',
    meta: {
      title: '通知',
      icon: 'el-icon-help'
    },
    component: LayoutNot,
    children: [{
      path: '/message',
      name: 'message',
      meta: {
        title: '通知',
        auth: '',
        icon: 'el-icon-help',
        parentAuth: ''
      },
      component: () => import('@/components/vendor/Message')
    }, ]
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情'
    },
    component: LayoutNot,
    children: [{
        path: '/detail/network',
        name: 'detail_network',
        meta: {
          title: '告警',
          auth: '31',
          icon: 'el-icon-picture-outline',
          parentAuth: '58',
          rootAuth: '58'
        },
        component: () => import('@/components/views/emerge/detail/detail-network')
      },
      {
        path: '/detail_alert',
        name: 'detail_alert',
        meta: {
          title: '告警详情'
        },
        component: () => import('@/components/views/emerge/detail/detail_alert')
      },
      {
        path: '/detail/computer',
        name: 'detail_computer',
        meta: {
          title: '计算机详情',
          auth: '32',
          icon: 'el-icon-picture-outline',
          parentAuth: '58',
          rootAuth: '58'
        },
        component: () => import('@/components/views/emerge/detail/detail-computer')
      },
      {
        path: '/detail/assets',
        name: 'detail_assets',
        meta: {
          title: '风险资产详情',
          auth: '21',
          icon: 'el-icon-picture-outline',
          parentAuth: '13',
          rootAuth: '13'
        },
        component: () => import('@/components/views/handle/detail/detail-assets')
      },
      {
        path: '/detail/assets/alert',
        name: 'assets_alert',
        meta: {
          title: '风险资产详情',
          auth: '21',
          icon: 'el-icon-picture-outline',
          parentAuth: '13',
          rootAuth: '13'
        },
        component: () => import('@/components/views/handle/detail/detail-alert')
      },
      {
        path: '/detail/works',
        name: 'detail_works',
        meta: {
          title: '工单详情',
          auth: '23',
          icon: 'el-icon-picture-outline',
          parentAuth: '13',
          rootAuth: '13'
        },
        component: () => import('@/components/views/handle/detail/detail-works')
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/components/vendor/screen/test')
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/components/vendor/screen/Screen')
  },
  {
    path: '/screen/set',
    name: 'screen_set',
    redirect: '/screen/set/top',
    component: () => import('@/components/vendor/screen/screen-set/screen-set'),
    children: [{
        path: '/screen/set/base',
        name: 'screen_set_base',
        query: {
          num: '0'
        },
        meta: {
          title: '基础设置',
          auth: '996',
          icon: 'e-aside-none',
          parentAuth: '995',
          rootAuth: '1',
          deep: 2
        },
        component: () => import('@/components/vendor/screen/screen-set-sup/vm-set-base.vue')
      },
      {
        path: '/screen/set_screen',
        name: 'screen_set_aside',
        query: {
          num: '1'
        },
        meta: {
          title: '顶部设置',
          auth: '996',
          icon: 'e-aside-none',
          parentAuth: '995',
          rootAuth: '1',
          deep: 2
        },
        component: () => import('@/components/vendor/screen/screen-set-sup/vm-set-screen.vue')
      },
      {
        path: '/screen/set_screen',
        name: 'screen_set_top',
        query: {
          num: '2'
        },
        meta: {
          title: '基础设置',
          auth: '996',
          icon: 'e-aside-none',
          parentAuth: '995',
          rootAuth: '1',
          deep: 2
        },
        component: () => import('@/components/vendor/screen/screen-set-sup/vm-set-screen.vue')
      }
    ]
  },
  {
    path: '/600',
    component: () => import('@/components/vendor/600')
  },
  {
    path: '/401',
    component: () => import('@/components/vendor/401')
  },
  {
    path: '*',
    component: () => import('@/components/vendor/404')
  }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

//异步挂载的路由，动态需要根据权限加载的路由表
export const asyncRouterMap = [
  /*首页*/
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'e-nav-home',
      auth: '1'
    },
    params: {
      name: 'home'
    },
    component: Layout,
    children: [{
        path: '/home/overview',
        name: 'overview',
        meta: {
          title: '总览',
          auth: '2',
          icon: 'e-aside-overview',
          parentAuth: '1',
          rootAuth: '1',
          deep: 1
        },
        component: () => import('@/components/views/home/Overview')
      },
      {
        path: '/home/screen_index',
        name: 'screen_index',
        meta: {
          title: '大屏',
          auth: '995',
          icon: 'e-aside-big',
          parentAuth: '1',
          rootAuth: '1',
          deep: 1
        },
        redirect: '/screen'
      }
    ]
  },
  /*处置*/
  {
    path: '/handle',
    name: 'handle',
    meta: {
      title: '处置',
      icon: 'e-nav-handle',
      auth: '13',
      role: ['admin']
    },
    component: Layout,
    children: [
      {
        path: '/handle/assets',
        name: 'assets',
        meta: {
          title: '资产维度',
          auth: '14',
          icon: 'e-aside-assets',
          parentAuth: '13',
          rootAuth: '13',
          deep: 1
        },
        component: () => import('@/components/views/handle/Assets')
      },
      {
        path: '/handle/risks',
        name: 'risks',
        meta: {
          title: '风险维度',
          auth: '23',
          icon: 'e-aside-risks',
          parentAuth: '13',
          rootAuth: '13',
          deep: 1
        },
        component: () => import('@/components/views/handle/Risks'),
        children: [
          {
            path: '/handle/risks/outside',
            name: 'outside',
            meta: {
              title: '外部威胁',
              auth: '24',
              icon: 'e-aside-none',
              parentAuth: '23',
              rootAuth: '13',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Outside')
          },
          {
            path: '/handle/risks/locality',
            name: 'locality',
            meta: {
              title: '本机威胁',
              auth: '44',
              icon: 'e-aside-none',
              parentAuth: '23',
              rootAuth: '13',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Locality')
          },
          {
            path: '/handle/risks/lateral',
            name: 'lateral',
            meta: {
              title: '横向威胁',
              auth: '32',
              icon: 'e-aside-none',
              parentAuth: '23',
              rootAuth: '13',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Lateral')
          },
          {
            path: '/handle/risks/outreath',
            name: 'outreath',
            meta: {
              title: '外连威胁',
              auth: '40',
              icon: 'e-aside-none',
              parentAuth: '23',
              rootAuth: '13',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Outreath')
          }
        ]
      },
      {
        path: '/handle/works',
        name: 'works',
        meta: {
          title: '工单中心',
          auth: '48',
          icon: 'e-aside-works',
          parentAuth: '13',
          rootAuth: '13',
          deep: 1
        },
        component: () => import('@/components/views/handle/Works')
      }
    ]
  },
  /*告警*/
  {
    path: '/emerge',
    name: 'emerge',
    meta: {
      title: '告警',
      icon: 'e-nav-emerge',
      auth: '58'
    },
    component: Layout,
    children: [{
      path: '/emerge/network',
      name: 'network',
      meta: {
        title: '告警',
        auth: '59',
        icon: 'e-aside-network',
        parentAuth: '58',
        rootAuth: '58',
        deep: 1
      },
      component: () => import('@/components/views/emerge/Network')
    }]
  },
  /*追查*/
  {
    path: '/invest',
    name: 'invest',
    meta: {
      title: '追查',
      icon: 'e-nav-invest',
      auth: '76'
    },
    component: Layout,
    children: [{
        path: '/invest/dns',
        name: 'dns',
        meta: {
          title: 'DNS追查',
          auth: '77',
          icon: 'e-aside-dns',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/Dns')
      },
      {
        path: '/invest/url',
        name: 'url',
        meta: {
          title: 'IP/URL追查',
          auth: '81',
          icon: 'e-aside-url',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/Url')
      },
      {
        path: '/invest/host',
        name: 'host',
        meta: {
          title: '主机追查',
          auth: '85',
          icon: 'e-aside-host',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/Host')
      },
      {
        path: '/invest/user',
        name: 'user',
        meta: {
          title: '用户追查',
          auth: '93',
          icon: 'e-aside-user',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/User')
      },
      {
        path: '/invest/file',
        name: 'file',
        meta: {
          title: '文件追查',
          auth: '97',
          icon: 'e-aside-file',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/File')
      },
      {
        path: '/invest/data',
        name: 'data',
        meta: {
          title: '数据传输追查',
          auth: '101',
          icon: 'e-aside-data',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/Data')
      },
      {
        path: '/invest/flow',
        name: 'flow',
        meta: {
          title: '流量方向追查',
          auth: '105',
          icon: 'e-aside-flow',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/Flow')
      },
      {
        path: '/invest/ioc',
        name: 'ioc',
        meta: {
          title: 'IOC扫描器',
          auth: '109',
          icon: 'e-aside-ioc',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/Ioc')
      },
      {
        path: '/invest/sandbox',
        name: 'sandbox',
        meta: {
          title: '沙箱',
          auth: '117',
          icon: 'e-aside-ioc',
          parentAuth: '76',
          rootAuth: '76',
          deep: 1
        },
        component: () => import('@/components/views/invest/sandbox')
      }
    ]
  },
  /*报表*/
  {
    path: '/report',
    name: 'report',
    meta: {
      title: '报表',
      icon: 'e-nav-report',
      auth: '123'
    },
    component: Layout,
    children: [{
        path: '/report/create',
        name: 'create',
        meta: {
          title: '报表生成',
          auth: '124',
          icon: 'e-aside-create',
          parentAuth: '123',
          rootAuth: '123',
          deep: 1
        },
        component: () => import('@/components/views/report/Create')
      },
      {
        path: '/report/sending',
        name: 'sending',
        meta: {
          title: '报表发送',
          auth: '130',
          icon: 'e-aside-sending',
          parentAuth: '123',
          rootAuth: '123',
          deep: 1
        },
        component: () => import('@/components/views/report/Sending')
      }
    ]
  },
  /*系统*/
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统',
      icon: 'e-nav-system',
      auth: '132'
    },
    component: Layout,
    children: [{
        path: '/system/control',
        name: 'control',
        meta: {
          title: '系统监控',
          auth: '61',
          icon: 'e-aside-control',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/system/Control'),
        children: [{
            path: '/system/control/move',
            name: 'move',
            meta: {
              title: '运行监控',
              auth: '611',
              icon: 'e-aside-move',
              parentAuth: '61',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/control/Move')
          },
          {
            path: '/system/control/safe',
            name: 'safe',
            meta: {
              title: '安全设备',
              auth: '612',
              icon: 'e-aside-safe',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/control/Safe')
          }
        ]
      },
      {
        path: '/system/setting',
        name: 'setting',
        meta: {
          title: '系统设置',
          auth: '62',
          icon: 'e-aside-control',
          parentAuth: '132',
          rootAuth: '132',
          deep: 1
        },
        component: () => import('@/components/views/system/Setting'),
        children: [{
            path: '/system/setting/wizard',
            name: 'wizard',
            meta: {
              title: '配置向导',
              auth: '621',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Wizard')
          },
          {
            path: '/system/setting/electric',
            name: 'electric',
            meta: {
              title: '网络配置',
              auth: '622',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Electric')
          },
          {
            path: '/system/setting/option',
            name: 'option',
            meta: {
              title: '系统选项',
              auth: '623',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Option')
          },
          {
            path: '/system/setting/monitor',
            name: 'monitor',
            meta: {
              title: '受监控IP',
              auth: '624',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Monitor')
          },
          {
            path: '/system/setting/threat',
            name: 'threat',
            meta: {
              title: '威胁通知',
              auth: '625',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Threat')
          },
          {
            path: '/system/setting/account',
            name: 'account',
            meta: {
              title: '账号管理',
              auth: '626',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Account')
          },
          {
            path: '/system/setting/rule',
            name: 'rule',
            meta: {
              title: '规则库及白名单',
              auth: '627',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Rule')
          },
          {
            path: '/system/setting/intellience',
            name: 'intellience',
            meta: {
              title: '情报管理',
              auth: '628',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Intellience')
          },
          {
            path: '/system/setting/label',
            name: 'label',
            meta: {
              title: '标签管理',
              auth: '629',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Label')
          },
          {
            path: '/system/setting/react',
            name: 'react',
            meta: {
              title: '联动',
              auth: '6210',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/React')
          },
          {
            path: '/system/setting/record',
            name: 'record',
            meta: {
              title: '日志',
              auth: '6211',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Record')
          },
          {
            path: '/system/setting/resume',
            name: 'resume',
            meta: {
              title: '恢复/重启',
              auth: '6212',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Resume')
          },
          {
            path: '/system/setting/licence',
            name: 'licence',
            meta: {
              title: '许可证',
              auth: '6213',
              icon: 'e-aside-none',
              parentAuth: '62',
              rootAuth: '132',
              deep: 2
            },
            component: () => import('@/components/views/system/setting/Licence')
          }
        ]
      }
    ]
  }
]
