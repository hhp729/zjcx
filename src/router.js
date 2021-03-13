import Vue from "vue";
import VueRouter from 'vue-router';


import Page from './views/firstView/Page';//主页面
import NextBus from './views/firstView/NextBus';//实时公交
import BusRouterDetail from './views/firstView/BusRouterDetail';//公交线路详情
import BusList from './views/firstView/BusList'//公交详细页面
import Map from './views/firstView/Map';//map

import Service from './views/firstView/Service';//服务大厅

import PersonalCenter from './views/firstView/PersonalCenter';//个人中心

import SiteQuery from './views/firstView/SiteQuery';//站点查询
import Suggestion from './views/firstView/Suggestion';//意见建议
import Search from './views/firstView/Search';//意见建议
import LocalRouter from './views/firstView/LocalRouter';//意见建议


import Lost from "./views/firstView/Lost";//失误招领
import Trip from "./views/firstView/Trip";//出行信息
import TripDetail from "./views/firstView/TripDetail";//出行信息详情






Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: "/",
      redirect: '/Page' //重定向
    },

    {
      name: '枝江公交',
      path: "/Page",
      component: Page,
    }, {
      name: '实时公交',
      path: "/NextBus",
      component: NextBus,
    }, {
      name: '服务大厅',
      path: "/Service",
      component: Service,
    }, {
      name: '个人中心',
      path: "/PersonalCenter",
      component: PersonalCenter,
    }, {
      name: '公交线路详情',
      path: '/BusRouterDetail/:id/:dir/:name/:reversalName',
      component: BusRouterDetail,
    }, {
      name: '地图',
      path: '/map/:id/:dir',
      component: Map,
    }, {
      name: '公交列表',
      path: '/busList/:id/:dir/:index',
      component: BusList,
    }, {
      name: '站点查询',
      path: '/SiteQuery',
      component: SiteQuery,
    }, {
      name: '意见建议',
      path: '/Suggestion',
      component: Suggestion,
    }, {
      name: '搜索',
      path: '/Search',
      component: Search,
    }, {
      name: '同城线路',
      path: '/LocalRouter/:name',
      component: LocalRouter,
    }, {
      name: "失物招领",
      path: "/Lost",
      component: Lost
    }, {
      name: "出行信息",
      path: "/Trip",
      component: Trip,
    }, {
      name: "出行信息详情",
      path: "/TripDetail",
      component: TripDetail
    }, {
      name: "包车服务",
      path: "/routerQuery",
      component: () => import('@/views/firstView/routerQuery'),
    }
  ]

})

export default router;